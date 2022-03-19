import React from "react";
const PictureForm = ({ imgPreview, HandleImagefile,ImageSubmit,setImgPreview,setIsOpen}) => {
    const cleanModal =()=>{
        setImgPreview(null)
        setIsOpen(false)
    }
    return (
    <>
      <h1 className="mb-1">Cambiar imagen:</h1>
      <label htmlFor="file" className="file-content">
        <i className="fas fa-upload file-icon"></i> Subir una imagen...
        <input type="file" name="file0" id="file" onChange={HandleImagefile} />
      </label>
      <div className="mb-1">
        <img src={imgPreview} />
      </div>
      <div className="btn-container">
        <div className="btn btn-primary"  onClick={()=>ImageSubmit()}>Aplicar cambios</div>
        <div className="btn btn-secondary" onClick={()=>cleanModal()}>Cancelar</div>
      </div>
    </>
  );
};
export default PictureForm;
