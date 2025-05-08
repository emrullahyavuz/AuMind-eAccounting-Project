using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace eMuhasebeServer.Application.Features.Invoices.GeneratePdf;

internal sealed class CreateInvoicePdfQueryHandler(
    IInvoiceRepository invoiceRepository) : IRequestHandler<CreateInvoicePdfQuery, byte[]>
{
    public async Task<byte[]> Handle(CreateInvoicePdfQuery request, CancellationToken cancellationToken)
    {
        var invoice = await invoiceRepository
                .Where(p => p.Id == request.InvoiceId)
                .Include(p => p.Details!)
                .ThenInclude(d => d.Product)
                .Include(p => p.Customer)
                .FirstOrDefaultAsync(cancellationToken) ?? throw new Exception("Fatura bulunamadı!");

        var pdfBytes = GeneratePdf(invoice);
        return pdfBytes;
    }

    public byte[] GeneratePdf(Invoice invoice)
    {
        var pdf = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(50);
                page.Size(PageSizes.A4);
                page.DefaultTextStyle(x => x.FontSize(12));

                page.Header().Element(c => ComposeHeader(c, invoice));
                page.Content().Element(c => ComposeContent(c, invoice));
                page.Footer().Element(ComposeFooter);
            });
        });

        using var stream = new MemoryStream();
        pdf.GeneratePdf(stream);
        return stream.ToArray();
    }

    public void ComposeHeader(IContainer container, Invoice invoice)
    {
        container.Column(column => // Ana kapsayıcıya bir sütun ekliyoruz
        {
            column.Item().Row(row =>
            {
                row.RelativeItem().Column(innerColumn =>
                {
                    innerColumn
                        .Item().Text($"Fatura No: {invoice.InvoiceNumber}")
                        .FontSize(20).SemiBold().FontColor(Colors.Blue.Medium);

                    innerColumn.Item().Text(text =>
                    {
                        text.Span("Tarih: ").SemiBold();
                        text.Span($"{invoice.Date.ToShortDateString()}");
                    });

                    column.Item().PaddingTop(10).LineHorizontal(1).LineColor(Colors.Grey.Lighten2);
                });
            });


            if (invoice.Customer != null)
            {
                column.Item().PaddingTop(10).Column(customerColumn =>
                {

                    
                    customerColumn.Item().Text(text =>
                    {
                        text.Span("Müşteri Adı: ").SemiBold();
                        text.Span($"{invoice.Customer.Name}");
                    });

                    customerColumn.Item().Text(text =>
                    {
                        text.Span("İl: ").SemiBold();
                        text.Span($"{invoice.Customer.City}");
                    });

                    customerColumn.Item().Text(text =>
                    {
                        text.Span("İlçe: ").SemiBold();
                        text.Span($"{invoice.Customer.Town}");
                    });

                    customerColumn.Item().Text(text =>
                    {
                        text.Span("Adres: ").SemiBold();
                        text.Span($"{invoice.Customer.FullAddress}");
                    });

                    customerColumn.Item().Text(text =>
                    {
                        text.Span("Vergi Dairesi: ").SemiBold();
                        text.Span($"{invoice.Customer.TaxDepartment}");
                    });

                    customerColumn.Item().Text(text =>
                    {
                        text.Span("Vergi Numarası: ").SemiBold();
                        text.Span($"{invoice.Customer.TaxNumber}");
                    });
                });
            }
            else
            {
                column.Item().PaddingTop(10).Text("Müşteri bilgisi bulunamadı.").Italic().FontColor(Colors.Grey.Medium);
            }
        });
    }

    public void ComposeContent(IContainer container, Invoice invoice)
    {
        container.PaddingVertical(40).Column(column =>
        {
            column.Spacing(20);

            if (invoice.Details != null && invoice.Details.Any())
            {
                column.Item().Element(c => ComposeTable(c, invoice.Details));
            }

            column.Item().PaddingRight(5).AlignRight().Text($"Toplam Tutar: {invoice.Amount:C}").SemiBold();
        });
    }

    public void ComposeTable(IContainer container, ICollection<InvoiceDetail> details)
    {
        var headerStyle = TextStyle.Default.SemiBold();

        container.Table(table =>
        {
            table.ColumnsDefinition(columns =>
            {
                columns.ConstantColumn(25);
                columns.RelativeColumn(3);
                columns.RelativeColumn();
                columns.RelativeColumn();
                columns.RelativeColumn();
                columns.RelativeColumn();
            });

            table.Header(header =>
            {
                header.Cell().Text("#");
                header.Cell().Text("Ürün Adı").Style(headerStyle);
                header.Cell().AlignRight().Text("Miktar").Style(headerStyle);
                header.Cell().AlignRight().Text("Birim Fiyat").Style(headerStyle);
                header.Cell().AlignRight().Text("KDV Oranı").Style(headerStyle);
                header.Cell().AlignRight().Text("Toplam").Style(headerStyle);

                header.Cell().ColumnSpan(6).PaddingTop(5).BorderBottom(1).BorderColor(Colors.Black);
            });

            foreach (var detail in details)
            {
                var index = details.ToList().IndexOf(detail) + 1;

                table.Cell().Element(CellStyle).Text($"{index}");
                table.Cell().Element(CellStyle).Text(detail.Product?.Name ?? "Bilinmiyor");
                table.Cell().Element(CellStyle).AlignRight().Text($"{detail.Quantity}");
                table.Cell().Element(CellStyle).AlignRight().Text($"{detail.Price:C}");
                table.Cell().Element(CellStyle).AlignRight().Text($"{detail.VATRate} %");
                table.Cell().Element(CellStyle).AlignRight().Text($"{detail.Price * detail.Quantity * (1 + detail.VATRate / 100):C}");

                static IContainer CellStyle(IContainer container) => container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingVertical(5);
            }
        });
    }

    public void ComposeFooter(IContainer container)
    {
        container.AlignCenter().Text(text =>
        {
            text.CurrentPageNumber();
            text.Span(" / ");
            text.TotalPages();
        });
    }
}