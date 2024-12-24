// import { useState } from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({handleFileChange}) => {
  // const [preview, setPreview] = useState(null);
   
  return (
    <div className='flex w-full h-[200px] justify-center rounded items-center bg-slate-300'>
      <input  type="file" onChange={handleFileChange} />
      {/* {preview && <img src={preview} alt="Preview" className="w-[100px] h-[100px] rounded-full" />} */}
    </div>
  );
};
FileUpload.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
};
export default FileUpload;
