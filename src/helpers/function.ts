export const handleSetPart = (data,field,dispatch , editPart ,value ) => {

    const start = data.findIndex((item:any) => item.id === field.id);

    dispatch(editPart())
    




};
