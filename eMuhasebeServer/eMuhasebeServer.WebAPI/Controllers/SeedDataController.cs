using Bogus;
using eMuhasebeServer.Application.Features.Customers.CreateCustomer;
using eMuhasebeServer.Application.Features.Customers.GetAllCustomers;
using eMuhasebeServer.Application.Features.Invoices.CreateInvoice;
using eMuhasebeServer.Application.Features.Invoices.GetAllInvoices;
using eMuhasebeServer.Application.Features.Products.CreateProduct;
using eMuhasebeServer.Application.Features.Products.GetAllProducts;
using eMuhasebeServer.Domain.Dtos;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.WebAPI.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace eMuhasebeServer.WebAPI.Controllers;

public sealed class SeedDataController(IMediator mediator) : ApiController(mediator)
{
    [HttpGet]
    public async Task<IActionResult> SeedProductsAndInvoices()
    {
        // Fetch existing customers and products
        var customerResult = await _mediator.Send(new GetAllCustomersQuery());
        var productResult = await _mediator.Send(new GetAllProductsQuery());

        var customers = customerResult.Data ?? new List<Customer>();
        var products = productResult.Data ?? new List<Product>();

        // Create new customers if none exist
        if (customers.Count < 50)
        {
            var faker = new Bogus.Faker("tr");
            for (int i = 0; i < 50; i++)
            {
                var createCustomerCommand = new CreateCustomerCommand(
                    Name: faker.Company.CompanyName(),
                    TypeValue: faker.Random.Int(1, 2),
                    City: faker.Address.City(),
                    Town: faker.Address.State(),
                    FullAdress: faker.Address.StreetAddress(),
                    TaxNumber: faker.Random.Replace("##########"),
                    TaxDepartment: faker.Address.City()
                );
                await _mediator.Send(createCustomerCommand);
            }

            // Re-fetch customers after creation
            customerResult = await _mediator.Send(new GetAllCustomersQuery());
            customers = customerResult.Data ?? new List<Customer>();
        }

        // Create new products if none exist
        if (products.Count < 50)
        {
            var faker = new Bogus.Faker("tr");
            for (int i = 0; i < 50; i++)
            {
                var createProductCommand = new CreateProductCommand(
                    Name: faker.Commerce.ProductName()
                );
                await _mediator.Send(createProductCommand);
            }

            // Re-fetch products after creation
            productResult = await _mediator.Send(new GetAllProductsQuery());
            products = productResult.Data ?? new List<Product>();
        }

        // Generate fake invoices
        var fakerInvoice = new Bogus.Faker("tr");
        var invoices = new List<CreateInvoiceCommand>();

        for (int i = 0; i < 100; i++)
        {
            var selectedCustomer = fakerInvoice.PickRandom(customers);
            var maxPickCount = Math.Min(products.Count, 5);
            var selectedProducts = fakerInvoice.PickRandom(products, fakerInvoice.Random.Int(1, maxPickCount)).ToList();

            var details = selectedProducts.Select(product => new InvoiceDetailDto
            {
                ProductId = product.Id,
                Quantity = fakerInvoice.Random.Int(1, 10),
                Price = fakerInvoice.Random.Int(10, 1000), 
                VATRate = fakerInvoice.Random.Int(1, 18) 
            }).ToList();

            var invoice = new CreateInvoiceCommand(
                TypeValue: fakerInvoice.PickRandom(new[] { 1, 2 }),
                Date: DateOnly.FromDateTime(fakerInvoice.Date.Recent(30)),
                InvoiceNumber: fakerInvoice.Random.Replace("INV#####"),
                CustomerId: selectedCustomer.Id,
                Details: details 
            );

            invoices.Add(invoice);
        }

        var allInvoicesResult = await _mediator.Send(new GetAllInvoicesQuery());
        var allInvoices = allInvoicesResult.Data ?? new List<Invoice>();

        // Yeni fatura işlemi yapılacaksa, her bir detayla döngüye giriyoruz
        foreach (var invoice in invoices)
        {
            bool isDuplicate = false;

            // Yeni faturadaki her bir ürünü kontrol ediyoruz
            foreach (var invoiceDetail in invoice.Details)
            {
                // Mevcut faturaların her birini kontrol et
                var duplicateInvoice = allInvoices.FirstOrDefault(existingInvoice =>
                    existingInvoice.Details != null && existingInvoice.Details.Any(d => d.ProductId == invoiceDetail.ProductId));

                // Eğer mevcut faturada aynı ürün var ise, duplicate olarak işaretle
                if (duplicateInvoice != null)
                {
                    isDuplicate = true;
                    break;
                }
            }

            // Eğer duplicate değilse, faturayı ekle
            if (!isDuplicate)
            {
                await _mediator.Send(invoice);
            }
        }

        return Ok($"{invoices.Count} fake invoices successfully created.");
    }
}
