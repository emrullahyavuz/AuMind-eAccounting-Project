import { useState, useEffect } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import {
  useGetAllBanksMutation,
  useGetAllCashRegistersMutation,
  useGetAllCustomersQuery,
  useGetAllBankDetailsMutation,
} from "../../../store/api";

function BankTransactionsModal({
  isOpen,
  onClose,
  onAddTransaction,
  bankData = {},
  isEditMode,
  onUpdateTransaction,
}) {
  const [formData, setFormData] = useState({
    recordType: "",
    bankId: "",
    date: "",
    type: "",
    amount: 0,
    oppositeBankId: "",
    oppositeCashRegisterId: "",
    oppositeCustomerId: "",
    oppositeAmount: 0,
    description: "",
  });

  const [recordOptions, setRecordOptions] = useState({
    banka: [],
    kasa: [],
    cari: [],
  });

  // RTK Query hooks
  const [getAllBanks] = useGetAllBanksMutation();
  const [getAllCashRegisters] = useGetAllCashRegistersMutation();
  const { data: customersData } = useGetAllCustomersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Reset form data when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        recordType: "",
        bankId: bankData.id || "",
        date: "",
        type: "",
        amount: 0,
        oppositeBankId: "",
        oppositeCashRegisterId: "",
        oppositeCustomerId: "",
        oppositeAmount: 0,
        description: "",
      });
    }
  }, [isOpen, bankData.id, isEditMode]);

  // Fetch options from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch banks
        const banksResponse = await getAllBanks().unwrap();
        const banks = banksResponse.data?.map((bank) => bank.name) || [];

        // Fetch cash registers
        const cashRegistersResponse = await getAllCashRegisters().unwrap();
        const cashRegisters =
          cashRegistersResponse.data?.map((cr) => cr.name) || [];

        // Customers are already fetched by the query hook
        const customers =
          customersData?.data?.map((customer) =>
            `${customer.name} ${customer.surname || ""}`.trim()
          ) || [];

        setRecordOptions({
          banka: banks,
          kasa: cashRegisters,
          cari: customers,
        });
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, [getAllBanks, getAllCashRegisters, customersData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" || name === "oppositeAmount") {
      const numValue = value === "" ? 0 : parseFloat(value) || 0;
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getRecordLabel = () => {
    switch (formData.recordType) {
      case "banka":
        return "Banka Seçiniz";
      case "kasa":
        return "Kasa Seçiniz";
      case "cari":
        return "Cari Seçiniz";
      default:
        return "Seçiniz";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    if (isEditMode) {
     
      onUpdateTransaction(formData);
      onClose();
    } else {
      try {
        let transactionData = { ...formData };

        // Remove recordType from the final data
        const { recordType, ...newBankTransactionData } = transactionData;

        // Fetch full record details based on the selected record type
        if (recordType === "banka" && transactionData.oppositeBankId) {
          const banksResponse = await getAllBanks().unwrap();
          const selectedBank = banksResponse.data?.find(
            (bank) => bank.name === transactionData.oppositeBankId
          );
          if (selectedBank) {
            newBankTransactionData.oppositeBankId =
              transactionData.oppositeBankId ? selectedBank.id : null;
          }
        } else if (
          recordType === "kasa" &&
          transactionData.oppositeCashRegisterId
        ) {
          const cashRegistersResponse = await getAllCashRegisters().unwrap();
          const selectedCashRegister = cashRegistersResponse.data?.find(
            (cr) => cr.name === transactionData.oppositeCashRegisterId
          );
          if (selectedCashRegister) {
            newBankTransactionData.oppositeCashRegisterId =
              transactionData.oppositeCashRegisterId
                ? selectedCashRegister.id
                : null;
          }
        } else if (
          recordType === "cari" &&
          transactionData.oppositeCustomerId
        ) {
          const selectedCustomer = customersData?.data?.find(
            (customer) =>
              `${customer.name} ${customer.surname || ""}`.trim() ===
              transactionData.oppositeCustomerId
          );
          if (selectedCustomer) {
            newBankTransactionData.oppositeCustomerId =
              transactionData.oppositeCustomerId ? selectedCustomer.id : "null";
          }
        }

        newBankTransactionData.type = formData.type === "giriş" ? 0 : 1;
        // Call the parent component's function with the complete data

        onAddTransaction({ bankId: bankData.id, ...newBankTransactionData });
        onClose();
      } catch (error) {
        console.error("Error processing transaction:", error);
        // You might want to show an error message to the user here
      }
    }
  };

  if (!isOpen) return null;

  return isEditMode ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-bold mb-6">
          Banka Hareketi Düzenle
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Tarih
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md p-2 bg-white pr-10"
                required
              />
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Tutar
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Tutar Giriniz..."
              className="w-full border border-gray-400 rounded-md p-2 bg-white"
              required
              step="0.01"
              min="0"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1 font-medium">
              Açıklama
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Açıklama Giriniz..."
              className="w-full border border-gray-400 rounded-md p-2 bg-white"
              rows="3"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:opacity-80 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-bold mb-6">
          Banka Hareketi Ekleme
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1 font-medium">
              Tarih
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md p-1 bg-white pr-10"
                required
              />
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-1 font-medium">
              İşlem Tipi
            </label>
            <div className="relative">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md p-1 bg-white appearance-none pr-10"
                required
              >
                <option value="" disabled>
                  Giriş - Çıkış...
                </option>
                <option value="giriş">Giriş</option>
                <option value="çıkış">Çıkış</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-1 font-medium">
              Tutar
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Tutar Giriniz..."
              className="w-full border border-gray-400 rounded-md p-1 bg-white"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-1 font-medium">
              Kayıt Tipi
            </label>
            <select
              name="recordType"
              value={formData.recordType}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-md p-1 bg-white appearance-none pr-10 mb-2"
              required
            >
              <option value="" disabled>
                Kayıt Tipi Seçiniz
              </option>
              <option value="banka">Banka</option>
              <option value="kasa">Kasa</option>
              <option value="cari">Cari</option>
            </select>
          </div>

          {formData.recordType && (
            <div className="mb-2">
              <label className="block text-gray-700 mb-1 font-medium">
                {formData.recordType === "banka"
                  ? "Banka"
                  : formData.recordType === "kasa"
                  ? "Kasa"
                  : "Cari"}
              </label>
              <select
                name={
                  formData.recordType === "banka"
                    ? "oppositeBankId"
                    : formData.recordType === "kasa"
                    ? "oppositeCashRegisterId"
                    : "oppositeCustomerId"
                }
                value={
                  formData.recordType === "banka"
                    ? formData.oppositeBankId
                    : formData.recordType === "kasa"
                    ? formData.oppositeCashRegisterId
                    : formData.oppositeCustomerId
                }
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md p-1 bg-white appearance-none pr-10"
                required
              >
                <option value="">{getRecordLabel()}</option>
                {recordOptions[formData.recordType]?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-2">
            <label className="block text-gray-700 mb-1 font-medium">
              Karşı Tutar
            </label>
            <input
              type="text"
              name="oppositeAmount"
              value={formData.oppositeAmount}
              onChange={handleChange}
              placeholder="Tutar Giriniz..."
              className="w-full border border-gray-400 rounded-md p-1 bg-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 mb-1 font-medium">
              Açıklama
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Açıklama Giriniz..."
              className="w-full border border-gray-400 rounded-md p-1 bg-white"
              rows="2"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-yellow-500 hover:opacity-80 text-white font-medium py-2 px-4 rounded-md w-full"
            >
              Banka Hareketi Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BankTransactionsModal;
