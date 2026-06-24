const FileUploader = () => {
    return (
        <div className="m-12">
            <input
                type="file"
                className="text-sm text-white file:mr-3 file:px-4 file:py-2 file:rounded-md file:border file:border-violet-700 file:bg-transparent file:text-sm file:text-white file:cursor-pointer hover:file:bg-accent"
            />
        </div>
    );
}

export default FileUploader;