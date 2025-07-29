import React, {useState} from 'react';
import Drawer from '@mui/material/Drawer';

import { ToastContainer } from 'react-toastify';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Grid from '@mui/material/Grid';



const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    margin: '10px',
    // maxWidth: 400,
  }));
  
  const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  });

export default function ProductForm({  onProductAdded  }) {
  const [state, setState] = useState({
    
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(!open)
      onProductAdded();
    setState({ ...state, [anchor]: open });
  };



  const showToast = (msg) => {
    toast.success(msg, {
      position: 'top-right',
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

const today = new Date();
const [selectedDate, setSelectedDate] = React.useState(dayjs(today));
// Set initial state for the DatePicker
const [formData, setFormData] = useState({
productCode: '',
productName: '',
categoryId: null,
price:0.0,
qty:0.0,
qtyType:'',
category: '',
imagePath: '',
description: '',
date: selectedDate.format('YYYY-MM-DD HH:mm:ss'),
});

const handleFormSubmit = async (event) => {
  event.preventDefault();
  console.log('form submitted');
  console.log(formData);
  
  // Await the API call before closing drawer
  await addProduct(formData);
  
  // Close drawer after successful adding
  toggleDrawer('right', false)(event); // pass event for safety, or just toggleDrawer('right', false)()
};
// const handleFormSubmit = (event) => {
// event.preventDefault();
// // Process the form data, for example, send it to a server or display it
// console.log('form submitted')
// console.log(formData);
// addCategory(formData);
// toggleDrawer('right', false)
// };
const addProduct = async (product) => {
  try {
    const response = await axios.post("http://localhost:8080/inventry/product", product);
    console.log(response);
    if(response.status === 201){
      showToast(product.productName + " Added");
    } else {
      showToast(product.productName + " Not Added");
    }
    return response;
  } catch (error) {
    showToast("Error adding Product");
    console.error(error);
    throw error; // allow caller to know of failure
  }
};

// const addCategory=async (category)=> {
// const response =await axios.post("http://localhost:8080/inventry/category",category)
// console.log(response)
// if(response.status==201){
//     showToast(category.categoryName+" Added");
    
// }else{
//     showToast(category.categoryName+" Not Added");
// }
// }

const handleInputChange = (event) => {
const { name, value } = event.target;
setFormData((prevData) => ({
  ...prevData,
  [name]: value,
}));
};




  const list = () => (
    <FormContainer>
    <Typography 
    variant="h6"  
    align="center" 
    gutterBottom 
    fontWeight="bold"
    style={{ color: 'blue' }} 
    >
      Add New Category
    </Typography>
    <Form onSubmit={handleFormSubmit}>
    <TextField name="productCode" label="Product Code" variant="outlined" onChange={handleInputChange} />
    <TextField name="productName" label="Product Name" variant="outlined" onChange={handleInputChange} />
    <TextField name="qty" label="Product Quantity" variant="outlined" onChange={handleInputChange} /> 
     <TextField name="price" label="Product Price" variant="outlined" onChange={handleInputChange} />
     <TextField name="qtyType" label="Product Price" variant="outlined" onChange={handleInputChange} />
    <TextField name="description" label="Description" variant="outlined" onChange={handleInputChange} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={['MobileDateTimePicker']}>
  
  <MobileDateTimePicker
    label="Controlled picker"
    value={selectedDate}
    defaultValue={dayjs(today)}
    onChange={(newValue) => setSelectedDate(newValue)}
  />
</DemoContainer>
</LocalizationProvider>

      <Button type='submit' variant="contained" color="primary">
        Submit
      </Button>
    </Form>
  </FormContainer>
     
  );

  return (
    <div>
      <Grid item xs={12} sm={6} md={6}>
      <Button variant="contained" onClick={toggleDrawer('right', true)}>Add Category</Button>
      </Grid>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list()}
          </Drawer>
          
          <ToastContainer />
    </div>
  );
}