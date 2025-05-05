import { Info, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import BankAddModal from "../components/UI/Modals/BankModal";
import { useNavigate } from "react-router-dom";
import { useGetAllBanksMutation } from "../store/api";
import { useToast } from "../hooks/useToast";

function Banks() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const navigate = useNavigate();
  const [getAllBanks] = useGetAllBanksMutation();

  const { showToast } = useToast();
  console.log(banks);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBanks();
        setBanks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Örnek banka verileri
  const bankList = [
    {
      id: 1,
      name: "GARANTİ BANKASI",
      iban: "0000001234567890",
      currencyType: "TL",
      input: 0,
      output: 0,
      balance: "0,0 TL",
    },
    {
      id: 2,
      name: "ZİRAAT BANKASI",
      iban: "0000001234567890",
      currencyType: "TL",
      input: 0,
      output: 0,
      balance: "0,0 TL",
    },
  ];

  const handleAddBank = (bankData) => {
    createBank(bankData)
      .unwrap()
      .then(() => {
        showToast("Banka başarıyla eklendi!", "success");
        setIsAddModalOpen(false);
      })
      .catch((error) => {
        showToast(error.data.message, "error");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Başlık */}
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Bankalar</h1>
        <Info className="ml-2 h-5 w-5 text-gray-500" />
      </div>

      {/* Banka Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mevcut Banka Kartları */}
        {banks.map((bank) => (
          <div key={bank.id} className="bg-gray-700 rounded-lg p-6 text-white">
            <h2 className="text-xl font-bold text-center mb-1">{bank.name}</h2>
            <div className="w-full h-0.5 bg-white mb-4 mx-auto"></div>

            <div className="text-center mb-4">
              <p className="text-gray-300">Iban Numarası</p>
              <p className="font-medium">{bank.iban}</p>
            </div>

            <div className="text-center mb-4">
              <p className="text-gray-300">Döviz Tipi</p>
              <p className="font-medium">{bank.currencyType.name}</p>
            </div>

            <div className="flex justify-between mb-4">
              <div className="text-center">
                <p className="text-gray-300">Giriş</p>
                <p className="font-medium">{bank.depositAmount}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">Çıkış</p>
                <p className="font-medium">{bank.withdrawalAmount}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-300">Bakiye</p>
                <p className="font-medium">{bank.balance}</p>
              </div>
            </div>

            <button
              onClick={() => {
                navigate(`/bank-transactions/${bank.id}`);
              }}
              className="w-full bg-white text-gray-800 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors"
            >
              Detaylar
            </button>
          </div>
        ))}

        {/* Yeni Banka Ekleme Kartı */}
        <div
          className="bg-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsAddModalOpen(true)}
        >
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Banka Ekleme Modalı */}
      <BankAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBank={handleAddBank}
      />
    </div>
  );
}

export default Banks;
