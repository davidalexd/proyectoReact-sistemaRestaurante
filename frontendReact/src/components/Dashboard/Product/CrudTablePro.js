import React from "react";
import { ProductItem } from "./ProductItem";
import "./../../../assets/css/style.css";
import "./../../../assets/css/configuration.css";
import { ModalForm } from "./ModalForm";
import Modal from "react-modal";
import { Loader } from "../Loader";
Modal.setAppElement("#root");
const CrudTablePro = ({
  data,
  setDataToEdit,
  deleteData,
  createData,
  updateData,
  dataToEdit,
  Loading,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1F1D2B",
      border: "0px",
      width: "60rem",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(23, 22, 32, 0.900)",
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="product-container">
        {Loading && <Loader />}
        <div className="product new-product center" onClick={openModal}>
          <div>
            <div className="plus">+</div>
            <div>Agregar nuevo plato</div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
        >
          <ModalForm
            createData={createData}
            updateData={updateData}
            setDataToEdit={setDataToEdit}
            closeModal={closeModal}
          />
        </Modal>
        {data.length > 0 ? (
          data.map((el) => (
            <ProductItem
              key={el.idProduct}
              el={el}
              deleteData={deleteData}
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />
          ))
        ) : (
            <h3>Sin datos</h3>
        )}
      </div>
    </>
  );
};

export default CrudTablePro;
