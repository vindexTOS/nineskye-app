import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, message, Select } from 'antd';
import axios from 'axios';
import { envirement } from '../../envirement/env';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ParcelsCard({ parcel, color, refetch }: { parcel: any; color: string; refetch: any }) {
  // State for creation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [type, setType] = useState('');
  const [website, setWebsite] = useState('');
  const [comment, setComment] = useState('');
  const [priceValue, setPriceValue] = useState('');
  // currency holds the selected currency code/value
  const [currency, setCurrency] = useState(); // default: ლარი
  // itemPrice holds the combined string (e.g., "100 GEL")
  const [itemPrice, setItemPrice] = useState('');

 
  // State for update modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateSelectedFile, setUpdateSelectedFile] = useState<File | null>(null);
  const [updateType, setUpdateType] = useState('');
  const [updateWebsite, setUpdateWebsite] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [updateItemPrice, setUpdateItemPrice] = useState(0);

  // State for declaration details modal (view declaration)
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [isDeclarationModalOpen, setIsDeclarationModalOpen] = useState(false);
 
  const token = cookies.get('token');
  useEffect(()=>{
console.log(parcel)
  },[parcel])
  // ------ Create Declaration Handlers ------
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('tracking_id', parcel.id);
    formData.append('price', String(itemPrice));
    formData.append('type', type);
    formData.append('website', website);
    formData.append('comment', comment);

    
    if (selectedFile) formData.append('file', selectedFile);

    try {
      await axios.post(envirement.baseUrl + '/user/declarate-parcel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
      refetch();
      message.success('დეკლარაცია წარმატებით აიტვირთა');
    } catch (error: any) {
      closeModal();
      message.error(error.message);
      console.error('Error uploading file:', error);
    }
  };

  // ------ View Declaration Handlers ------
  const handleOpenDeclaration = (parcel: any) => {
    setSelectedParcel(parcel);
    setIsDeclarationModalOpen(true);
  };

  const openDeclarationPDF = () => {
    if (selectedParcel?.declaration?.invoice_Pdf) {
      const blob = new Blob([new Uint8Array(selectedParcel.declaration.invoice_Pdf.data)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url);
    }
  };

  // ------ Update Declaration Handlers ------
  const handleOpenUpdateModal = (parcel: any) => {
    if (parcel.declaration) {
      setUpdateType(parcel.declaration.type || '');
      setUpdateWebsite(parcel.declaration.website || '');
      setUpdateComment(parcel.declaration.comment || '');
      setUpdateItemPrice(parcel.declaration.price || 0);
    }
    setIsUpdateModalOpen(true);
  };

  const handleUpdateFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUpdateSelectedFile(event.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('tracking_id', parcel.id);
    formData.append('price', String(updateItemPrice));
    formData.append('type', updateType);
    formData.append('website', updateWebsite);
    formData.append('comment', updateComment);

    if (updateSelectedFile) formData.append('file', updateSelectedFile);

    try {
      await axios.put(envirement.baseUrl + '/user/update-declaration', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setIsUpdateModalOpen(false);
      refetch();
      message.success('დეკლარაცია განახლდა წარმატებით');
    } catch (error: any) {
      setIsUpdateModalOpen(false);
      message.error('დეკლარაციის განახლებისას შეცდომა მოხდა');
      console.error('Error updating declaration:', error);
    }
  };




// 

const categories = [
  { value: 'ტექნოლოგიური', label: 'ტექნოლოგიური' },
  { value: 'ოფისის მასალები', label: 'ოფისის მასალები' },
  { value: 'საოჯახო ნივთები', label: 'საოჯახო ნივთები' },
  { value: 'კოსმეტიკა', label: 'კოსმეტიკა' },
  { value: 'თამაშები', label: 'თამაშები' },
  { value: 'სპორტული აქსესუარები', label: 'სპორტული აქსესუარები' },
  { value: 'კულინარიული ნივთები', label: 'კულინარიული ნივთები' },
  { value: 'ავტომობილური ნაწილები', label: 'ავტომობილური ნაწილები' },
  { value: 'მედიცინის ნივთები', label: 'მედიცინის ნივთები' },
  { value: 'სხვა', label: 'სხვა' },
];

const [selectedCategory, setSelectedCategory] = useState('');
const handleCategoryChange = (value:any) => {
  setSelectedCategory(value);
  // If the user selects any option except "სხვა", update the type state directly.
  if (value !== 'სხვა') {
    setType(value);
  } else {
    // Reset the type state if "სხვა" is selected so the user can type a new value.
    setType('');
  }
};

const handleInputChange = (e:any) => {
  setType(e.target.value);
};
// 

const currencies = [
  // { value: 'EUR', label: 'ევრო' },
  { value: 'USD', label: 'დოლარი' },
  { value: 'CNY', label: 'ჩინური იანი' },
  { value: 'TRY', label: 'თურქული ლარი' },
  // { value: 'GEL', label: 'ლარი' },
  // { value: 'GBP', label: 'ბრიტანული ფუნტი' },
  // { value: 'JPY', label: 'იაპონური იენი' },
  // { value: 'AUD', label: 'ავსტრალიური დოლარი' },
  // { value: 'CAD', label: 'კანადური დოლარი' },
  // { value: 'CHF', label: 'შვეიცარიელი ფრანკი' },
];

const handlePriceChange = (e:any) => {
  const numberVal = e.target.value;
  setPriceValue(numberVal);
  setItemPrice(`${numberVal} ${currency}`);
};

// When the currency changes, update the state and the combined itemPrice string
const handleCurrencyChange = (value:any) => {
  setCurrency(value);
  setItemPrice(`${priceValue} ${value}`);
};
//  jort softs zdie


// New state for the update modal category selection
const [updateSelectedCategory, setUpdateSelectedCategory] = useState('');

// Handler for the update modal category change
const handleUpdateCategoryChange = (value: any) => {
  setUpdateSelectedCategory(value);
  // If the value is not 'სხვა', update updateType directly
  if (value !== 'სხვა') {
    setUpdateType(value);
  } else {
    // Clear updateType when 'სხვა' is selected so the user can type a custom value
    setUpdateType('');
  }
};

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
      {/* Upper Section */}
      <div style={{ backgroundColor: color }} className="text-white p-4">
        <div className="flex flex-wrap justify-between text-[1rem]">
          {/* <div className="flex items-center">
            <span className="font-medium mr-1">ჩამოსვლის დრო:</span>
            <span>{  Date(parcel.arrived_at)  }</span>
          </div> */}
          <div className="flex items-center">
            <span className="font-medium mr-1">ფასი:</span>
            <span className="text-green-400 font-bold">₾ {parcel.price ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="p-4 bg-gray-100">
        <div className="flex flex-wrap justify-between text-[1rem]">
          <div className="flex items-center">
            <span className="font-medium mr-1">თრექინგი ID:</span>
            <span>{parcel.id ?? 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">წონა:</span>
            <span>{parcel.weight} kg</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-1">გადახდა:</span>
            <span className={`font-bold ${parcel.payment_status === 'Unpaid' ? 'text-red-500' : 'text-green-500'}`}>
              {parcel.payment_status === 'Unpaid' ? 'გადაუხდელია' : 'გადახდილია'}
            </span>
          </div>
          <div className="flex items-center">
            {parcel.declaration ? (
              <>
                <button
                  className="ml-2 bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleOpenDeclaration(parcel)}
                >
                  აქტიური დეკლარაცია
                </button>
                {/* Uncomment below to show update button if needed */}
                {/* <button
                  className="ml-2 bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600"
                  onClick={() => handleOpenUpdateModal(parcel)}
                >
                  რედაქტირება
                </button> */}
              </>
            ) : (
              <button
                className="ml-2 bg-green-500 text-white px-2 py-2 rounded hover:bg-blue-600"
                onClick={openModal}
              >
                დეკლარაცია
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Creating Declaration */}
      <Modal visible={isModalOpen} onCancel={closeModal} footer={null} title="დეკლარაციის ატვირთვა">
        <h2 className="text-xl mb-4">დეკლერაცის ატვირთვა (PDF)</h2>
        <div className="mb-4">
        <div>
      <Select
        placeholder="აირჩიეთ კატეგორია"
        value={selectedCategory || undefined}
        onChange={handleCategoryChange}
        style={{ width: '100%', marginBottom: 8 }}
      >
        {categories.map((cat) => (
          <Select.Option key={cat.value} value={cat.value}>
            {cat.label}
          </Select.Option>
        ))}
      </Select>

      {/* When "სხვა" (Other) is selected, show an input to type the custom category */}
      {selectedCategory === 'სხვა' && (
        <Input
          placeholder="გთხოვთ შეიყვანეთ კატეგორია"
          value={type}
          onChange={handleInputChange}
          style={{ width: '100%' }}
        />
      )}
    </div>
          <Input
            placeholder="ვებ საიტი (e.g., Taobao, eBay)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mb-2"
          />
          {/*  */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
  <Input
    placeholder="ფასი (რიცხვით)"
    value={priceValue}
    type="number"
    onChange={handlePriceChange}
    style={{ flex: 1 }}  // takes remaining space
  />
  <Select
    placeholder="აირჩიეთ ვალუტა"
    value={currency}
    onChange={handleCurrencyChange}
    style={{ width: 160 }}  // fixed width for currency select
  >
    {currencies.map((curr) => (
      <Select.Option key={curr.value} value={curr.value}>
        {curr.label}
      </Select.Option>
    ))}
  </Select>
</div>
    {/*  */}
          <Input.TextArea
            placeholder="დამატებითი ინფორმაცია"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
          />
          <div className="flex flex-col ">
            <label htmlFor='invoice'>ინვოისი</label>
     <input type="file"  id='invoice' accept="application/pdf" onChange={handleFileChange} className="mb-2" /></div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button className="bg-gray-400 text-white" onClick={closeModal}>
            გაუქმება
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600" type="primary" onClick={handleUpload}>
            ატვირთვა
          </Button>
        </div>
      </Modal>

      {/* Declaration Details Modal */}
      <Modal title="დეკლარაციის დეტალები" open={isDeclarationModalOpen} onCancel={() => setIsDeclarationModalOpen(false)} footer={null}>
        {selectedParcel?.declaration ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold w-1/3">ID:</span>
              <span className="w-2/3">{selectedParcel.declaration.id}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-1/3">ტიპი:</span>
              <span className="w-2/3">{selectedParcel.declaration.type}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-1/3">ფასი:</span>
              <span className="w-2/3">{selectedParcel.declaration.price}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-1/3">Website:</span>
              <a
                href={selectedParcel.declaration.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 w-2/3"
              >
                {selectedParcel.declaration.website}
              </a>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-1/3">კომენტარი:</span>
              <span className="w-2/3">{selectedParcel.declaration.comment}</span>
            </div>
            {selectedParcel.declaration.invoice_Pdf && (
              <div className="flex justify-center mt-6">
                <Button type="primary" onClick={openDeclarationPDF}>
                  ინვოისის ნახვა
                </Button>
              </div>
            )}
            <div className="flex justify-center mt-6">
              <Button
                type="default"
                onClick={() => handleOpenUpdateModal(selectedParcel)}
                className="bg-yellow-500 text-white px-2 py-2 rounded hover:bg-yellow-600"
              >
                რედაქტირება
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">დეკლარაცია არ არსებობს</p>
        )}
      </Modal>

      {/* Modal for Updating Declaration */}
      <Modal
  visible={isUpdateModalOpen}
  onCancel={() => setIsUpdateModalOpen(false)}
  footer={null}
  title="დეკლარაციის განახლება"
>
  <h2 className="text-xl mb-4">დეკლერაცის განახლება (PDF)</h2>
  <div className="mb-4">
    {/* Optionally include category selection if needed */}
    <div>
    <Select
  placeholder="აირჩიეთ კატეგორია"
  value={selectedCategory || undefined}
  onChange={handleCategoryChange}
  style={{ width: '100%', marginBottom: 8 }}
>
  {categories.map((cat) => (
    <Select.Option key={cat.value} value={cat.value}>
      {cat.label}
    </Select.Option>
  ))}
</Select>
{updateSelectedCategory === 'სხვა' && (
  <Input
    placeholder="გთხოვთ შეიყვანეთ კატეგორია"
    value={updateType}
    onChange={(e) => setUpdateType(e.target.value)}
    style={{ width: '100%' }}
  />
)}
    </div>

    <Input
      placeholder="ვებ საიტი (e.g., Taobao, eBay)"
      value={updateWebsite}
      onChange={(e) => setUpdateWebsite(e.target.value)}
      className="mb-2"
    />

    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Input
        placeholder="ფასი (რიცხვით)"
        value={updateItemPrice}
        type="number"
        onChange={(e) => setUpdateItemPrice(Number(e.target.value))}
        style={{ flex: 1 }}
      />
<Select
  placeholder="აირჩიეთ კატეგორია"
  value={currency || undefined}
  onChange={handleUpdateCategoryChange}
  style={{ width:150, marginBottom: 8 }}
>
{currencies.map((cat) => (

<Select.Option key={cat.value} value={cat.value}>
  {cat.label}
</Select.Option>
))}
</Select>
    </div>

    <Input.TextArea
      placeholder="დამატებითი ინფორმაცია"
      value={updateComment}
      onChange={(e) => setUpdateComment(e.target.value)}
      className="mb-2"
    />

    <div className="flex flex-col">
      <label htmlFor="updateInvoice">ინვოისი</label>
      <input
        type="file"
        id="updateInvoice"
        accept="application/pdf"
        onChange={handleUpdateFileChange}
        className="mb-2"
      />
    </div>
  </div>

  <div className="flex justify-end gap-4 mt-4">
    <Button
      className="bg-gray-400 text-white"
      onClick={() => setIsUpdateModalOpen(false)}
    >
      გაუქმება
    </Button>
    <Button
      className="bg-blue-500 text-white hover:bg-blue-600"
      type="primary"
      onClick={handleUpdate}
    >
      ატვირთვა
    </Button>
  </div>
</Modal>

    </div>
  );
}
