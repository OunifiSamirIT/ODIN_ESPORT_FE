import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({multiple , setUploadedFiles ,onChange }) => {

    multiple = multiple || false;
    const [files, setFiles] = useState([])
    useEffect(() => {
        setUploadedFiles(files)
        if (onChange) {
            onChange();
          }
    },[files,setUploadedFiles,onChange])
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        if (acceptedFiles?.length && multiple) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
        } else {
            setFiles(acceptedFiles.map(file =>
                Object.assign(file, { preview: URL.createObjectURL(file) })
            ))
        }

    }, [multiple,onChange])
    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: multiple === false ?  1 : 0  , onDrop })

    return (
        <>
            <div {...getRootProps({ className: 'col-lg-12 mb-5' })} >
                <div className="card mt-3 border-0">
                    <div className="card-body d-flex justify-content-between align-items-end p-0">
                        <div className="form-group mb-0 w-100">
                            <input type="file" name="file" {...getInputProps({ className: 'input-file' })} multiple/>
                            <label htmlFor="file" className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed">
                                <i className="ti-cloud-down large-icon me-3 d-block"></i>
                                <span className="js-fileName">{
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drag and drop an Image here, or click to select files</p>
                                }</span>
                            </label>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-6 row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3">
                {files.map((file) => (
                    <div key={file.name} className="col mb-4">
                        <div className="card h-100 rounded-md shadow">
                            <img
                                src={file.preview}
                                alt={file.name}
                                onLoad={() => {
                                    URL.revokeObjectURL(file.preview);
                                }}
                                className="card-img-top h-100 w-100 object-fit rounded-md"
                            />
                            <button
                                type="button"
                                className="btn btn-primary btn-circle position-absolute top-0 end-0 mt-1 me-1 hover-bg-white transition"
                                onClick={() => removeFile(file.name)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default Dropzone