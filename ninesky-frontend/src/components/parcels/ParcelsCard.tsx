import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
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
  const [itemPrice, setItemPrice] = useState(0);

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

    if (itemPrice >= 300 && !selectedFile) {
      message.error('ატვირთეთ ინვოისი');
      return;
    }
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
          <Input
            placeholder="Type (e.g., Technological)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Website (e.g., Taobao, eBay)"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="ფასი (ლარსი)"
            value={itemPrice}
            type="number"
            onChange={(e) => setItemPrice(Number(e.target.value))}
            className="mb-2"
          />
          <Input.TextArea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2"
          />
          {itemPrice >= 300 && (
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-2" />
          )}
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
              <span className="w-2/3">₾ {selectedParcel.declaration.price}</span>
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
      <Modal visible={isUpdateModalOpen} onCancel={() => setIsUpdateModalOpen(false)} footer={null} title="დეკლარაციის განახლება">
        <h2 className="text-xl mb-4">დეკლერაცის ატვირთვა (PDF)</h2>
        <div className="mb-4">
          <Input
            placeholder="Type (e.g., Technological)"
            value={updateType}
            onChange={(e) => setUpdateType(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Website (e.g., Taobao, eBay)"
            value={updateWebsite}
            onChange={(e) => setUpdateWebsite(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="ფასი (ლარსი)"
            value={updateItemPrice}
            type="number"
            onChange={(e) => setUpdateItemPrice(Number(e.target.value))}
            className="mb-2"
          />
          <Input.TextArea
            placeholder="Comment"
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
            className="mb-2"
          />
          {updateItemPrice >= 300 && (
            <input type="file" accept="application/pdf" onChange={handleUpdateFileChange} className="mb-2" />
          )}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button className="bg-gray-400 text-white" onClick={() => setIsUpdateModalOpen(false)}>
            გაუქმება
          </Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600" type="primary" onClick={handleUpdate}>
            ატვირთვა
          </Button>
        </div>
      </Modal>
    </div>
  );
}
