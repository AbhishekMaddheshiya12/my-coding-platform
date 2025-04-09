const corsOption = {
    origin:"http://localhost:5173",
    Credential:true
}

const getBase64 = (file) => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`

export {corsOption,getBase64};

