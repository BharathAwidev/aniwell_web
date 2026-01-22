// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Chip,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Switch,
//   FormControlLabel,
//   Tooltip,
//   Avatar,
//   Rating,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Home as HomeIcon,
//   DesignServices as DesignIcon,
//   LocationCity as CityIcon,
//   MenuBook as MagazineIcon,
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';

// // Interior Design Categories
// const categories = [
//   { id: 'cat-1', name: 'Design Ideas' },
//   { id: 'cat-2', name: 'Magazine' },
//   { id: 'cat-3', name: 'Cities' },
//   { id: 'cat-4', name: 'Projects' },
// ];

// // Interior Design Subcategories
// const subcategories = [
//   { id: 'sub-1', name: 'Modular Kitchen Designs', categoryId: 'cat-1' },
//   { id: 'sub-2', name: 'Wardrobe Designs', categoryId: 'cat-1' },
//   { id: 'sub-3', name: 'Bathroom Designs', categoryId: 'cat-1' },
//   { id: 'sub-4', name: 'Living Room Designs', categoryId: 'cat-1' },
//   { id: 'sub-5', name: 'Room Ideas', categoryId: 'cat-2' },
//   { id: 'sub-6', name: 'Home Decor', categoryId: 'cat-2' },
//   { id: 'sub-7', name: 'Ahmedabad', categoryId: 'cat-3' },
//   { id: 'sub-8', name: 'Mumbai', categoryId: 'cat-3' },
// ];

// // Interior Design Projects
// const initialProducts = [
//   {
//     id: 'proj-1',
//     name: 'Modern Modular Kitchen',
//     description: 'Contemporary modular kitchen with smart storage solutions',
//     sku: 'KITCHEN-MOD-001',
//     price: 250000,
//     cost: 180000,
//     stock: 5,
//     categoryId: 'cat-1',
//     subcategoryId: 'sub-1',
//     categoryName: 'Design Ideas',
//     subcategoryName: 'Modular Kitchen Designs',
//     isActive: true,
//     images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
//     dimensions: '10ft x 12ft',
//     material: 'Wood & Glass',
//     style: 'Modern',
//     createdAt: '2024-01-15',
//     updatedAt: '2024-01-15',
//     rating: 4.5,
//   },
//   {
//     id: 'proj-2',
//     name: 'Walk-in Wardrobe',
//     description: 'Luxury walk-in wardrobe with custom compartments',
//     sku: 'WARDROBE-WI-002',
//     price: 180000,
//     cost: 120000,
//     stock: 8,
//     categoryId: 'cat-1',
//     subcategoryId: 'sub-2',
//     categoryName: 'Design Ideas',
//     subcategoryName: 'Wardrobe Designs',
//     isActive: true,
//     images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400'],
//     dimensions: '8ft x 10ft',
//     material: 'Plywood & Mirrors',
//     style: 'Contemporary',
//     createdAt: '2024-01-16',
//     updatedAt: '2024-01-16',
//     rating: 4.8,
//   },
//   {
//     id: 'proj-3',
//     name: 'Luxury Bathroom Suite',
//     description: 'Premium bathroom with modern fixtures and marble finish',
//     sku: 'BATH-LUX-003',
//     price: 350000,
//     cost: 250000,
//     stock: 3,
//     categoryId: 'cat-1',
//     subcategoryId: 'sub-3',
//     categoryName: 'Design Ideas',
//     subcategoryName: 'Bathroom Designs',
//     isActive: true,
//     images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w-400'],
//     dimensions: '12ft x 15ft',
//     material: 'Marble & Ceramic',
//     style: 'Luxury',
//     createdAt: '2024-01-17',
//     updatedAt: '2024-01-17',
//     rating: 4.7,
//   },
//   {
//     id: 'proj-4',
//     name: 'Ahmedabad Villa Project',
//     description: 'Complete interior design for villa in Ahmedabad',
//     sku: 'CITY-AHM-004',
//     price: 1200000,
//     cost: 850000,
//     stock: 2,
//     categoryId: 'cat-3',
//     subcategoryId: 'sub-7',
//     categoryName: 'Cities',
//     subcategoryName: 'Ahmedabad',
//     isActive: true,
//     images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400'],
//     dimensions: '3000 sq ft',
//     material: 'Various',
//     style: 'Modern Indian',
//     createdAt: '2024-01-18',
//     updatedAt: '2024-01-18',
//     rating: 4.9,
//   },
// ];

// export default function Products() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   const [products, setProducts] = useState(initialProducts);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<any>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     sku: '',
//     price: 0,
//     cost: 0,
//     stock: 0,
//     categoryId: categories[0]?.id || '',
//     subcategoryId: '',
//     isActive: true,
//     images: [''],
//     dimensions: '',
//     material: '',
//     style: '',
//   });
//   const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);

//   useEffect(() => {
//     if (formData.categoryId) {
//       const filtered = subcategories.filter(
//         sub => sub.categoryId === formData.categoryId
//       );
//       setFilteredSubcategories(filtered);
//       if (filtered.length > 0 && !formData.subcategoryId) {
//         setFormData(prev => ({ ...prev, subcategoryId: filtered[0].id }));
//       }
//     }
//   }, [formData.categoryId, subcategories]);

//   const handleOpenDialog = (product: any = null) => {
//     if (product) {
//       setEditingProduct(product);
//       setFormData({
//         name: product.name,
//         description: product.description,
//         sku: product.sku,
//         price: product.price,
//         cost: product.cost,
//         stock: product.stock,
//         categoryId: product.categoryId,
//         subcategoryId: product.subcategoryId,
//         isActive: product.isActive,
//         images: product.images,
//         dimensions: product.dimensions,
//         material: product.material,
//         style: product.style,
//       });
//     } else {
//       setEditingProduct(null);
//       setFormData({
//         name: '',
//         description: '',
//         sku: '',
//         price: 0,
//         cost: 0,
//         stock: 0,
//         categoryId: categories[0]?.id || '',
//         subcategoryId: filteredSubcategories[0]?.id || '',
//         isActive: true,
//         images: [''],
//         dimensions: '',
//         material: '',
//         style: '',
//       });
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingProduct(null);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? parseFloat(value) : value,
//     }));
//   };

//   const handleSelectChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       isActive: e.target.checked,
//     }));
//   };

//   const handleSubmit = () => {
//     const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
//     const selectedSubcategory = subcategories.find(sub => sub.id === formData.subcategoryId);

//     if (editingProduct) {
//       // Update existing product
//       setProducts(prev =>
//         prev.map(prod =>
//           prod.id === editingProduct.id
//             ? {
//                 ...prod,
//                 ...formData,
//                 categoryName: selectedCategory?.name || '',
//                 subcategoryName: selectedSubcategory?.name || '',
//                 updatedAt: new Date().toISOString().split('T')[0],
//               }
//             : prod
//         )
//       );
//     } else {
//       // Add new product
//       const newProduct = {
//         id: `proj-${products.length + 1}`,
//         ...formData,
//         categoryName: selectedCategory?.name || '',
//         subcategoryName: selectedSubcategory?.name || '',
//         createdAt: new Date().toISOString().split('T')[0],
//         updatedAt: new Date().toISOString().split('T')[0],
//         rating: 4.0,
//       };
//       setProducts(prev => [...prev, newProduct]);
//     }
//     handleCloseDialog();
//   };

//   const handleDelete = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       setProducts(prev => prev.filter(prod => prod.id !== id));
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getCategoryIcon = (categoryName: string) => {
//     switch (categoryName) {
//       case 'Design Ideas': return <DesignIcon />;
//       case 'Magazine': return <MagazineIcon />;
//       case 'Cities': return <CityIcon />;
//       case 'Projects': return <HomeIcon />;
//       default: return <HomeIcon />;
//     }
//   };

//   const getCategoryColor = (categoryName: string) => {
//     switch (categoryName) {
//       case 'Design Ideas': return 'primary';
//       case 'Magazine': return 'secondary';
//       case 'Cities': return 'info';
//       case 'Projects': return 'success';
//       default: return 'default';
//     }
//   };

//   // Responsive table cell styling
//   const tableCellStyles = {
//     py: { xs: 1, sm: 1.5 },
//     px: { xs: 1, sm: 2 },
//     fontSize: { xs: '0.75rem', sm: '0.875rem' },
//     minWidth: { xs: '120px', sm: 'auto' },
//   };

//   return (
//     <Box sx={{ 
//       p: { xs: 1, sm: 2, md: 3 },
//       width: '100%',
//       maxWidth: '100%',
//       overflowX: 'hidden',
//       boxSizing: 'border-box'
//     }}>
//       {/* Header Section */}
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: { xs: 'column', sm: 'row' },
//         justifyContent: 'space-between', 
//         alignItems: { xs: 'flex-start', sm: 'center' },
//         gap: 2,
//         mb: 3,
//         width: '100%'
//       }}>
//         <Box display="flex" alignItems="center" gap={2}>
//           <HomeIcon sx={{ 
//             fontSize: { xs: 24, sm: 28, md: 32 }, 
//             color: 'primary.main' 
//           }} />
//           <Typography variant="h4" sx={{ 
//             fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
//             lineHeight: 1.2
//           }}>
//             Interior Design Projects
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => handleOpenDialog()}
//           size={isMobile ? 'small' : 'medium'}
//           sx={{ minWidth: { xs: 'auto', sm: '140px' } }}
//         >
//           {isMobile ? 'Add' : 'Add Service '}
//         </Button>
//       </Box>

//       {/* Navigation Buttons */}
//       <Box sx={{ 
//         mb: 3, 
//         display: 'flex', 
//         gap: 2, 
//         flexWrap: 'wrap',
//         width: '100%'
//       }}>
//         <Button
//           component={Link}
//           to="/products/categories"
//           variant="outlined"
//           startIcon={<DesignIcon />}
//           size={isMobile ? 'small' : 'medium'}
//           sx={{ 
//             flex: { xs: '1 1 auto', sm: '0 1 auto' },
//             minWidth: { xs: '140px', sm: 'auto' }
//           }}
//         >
//           {isMobile ? 'Categories' : 'Design Categories'}
//         </Button>
//         <Button
//           component={Link}
//           to="/products/subcategories"
//           variant="outlined"
//           startIcon={<DesignIcon />}
//           size={isMobile ? 'small' : 'medium'}
//           sx={{ 
//             flex: { xs: '1 1 auto', sm: '0 1 auto' },
//             minWidth: { xs: '140px', sm: 'auto' }
//           }}
//         >
//           {isMobile ? 'Subcategories' : 'Design Subcategories'}
//         </Button>
//       </Box>

//       {/* Projects Table Card */}
//       <Card elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
//         <CardContent sx={{ p: { xs: 0, sm: 1, md: 2 } }}>
//           <Box sx={{ width: '100%', overflowX: 'auto' }}>
//             <TableContainer 
//               component={Paper} 
//               elevation={0}
//               sx={{ 
//                 minWidth: '800px', // Minimum width for table
//                 width: '100%',
//               }}
//             >
//               <Table sx={{ width: '100%' }}>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ 
//                       fontWeight: 'bold', 
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 1, sm: 2 },
//                       minWidth: '250px'
//                     }}>
//                       Project
//                     </TableCell>
//                     <TableCell sx={{ 
//                       fontWeight: 'bold', 
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 1, sm: 2 },
//                       minWidth: '120px'
//                     }}>
//                       SKU
//                     </TableCell>
//                     <TableCell sx={{ 
//                       fontWeight: 'bold', 
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 1, sm: 2 },
//                       minWidth: '140px'
//                     }}>
//                       Price
//                     </TableCell>
//                     <TableCell sx={{ 
//                       fontWeight: 'bold', 
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 1, sm: 2 },
//                       minWidth: '100px'
//                     }}>
//                       Stock
//                     </TableCell>
//                     <TableCell sx={{ 
//                       fontWeight: 'bold', 
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 1, sm: 2 },
//                       minWidth: '180px'
//                     }}>
//                       Category
//                     </TableCell>
//                     <TableCell sx={{ 
//                       fontWeight: 'bold', 
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 1, sm: 2 },
//                       minWidth: '120px'
//                     }}>
//                       Rating
//                     </TableCell>
//                     <TableCell sx={{ 
//                       fontWeight: 'bold', 
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 1, sm: 2 },
//                       minWidth: '100px'
//                     }}>
//                       Status
//                     </TableCell>
//                     <TableCell align="center" sx={{ 
//                       fontWeight: 'bold', 
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 1, sm: 2 },
//                       minWidth: '120px'
//                     }}>
//                       Actions
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {products.map(product => (
//                     <TableRow 
//                       key={product.id}
//                       sx={{ 
//                         '&:hover': { backgroundColor: 'action.hover' },
//                         '&:last-child td, &:last-child th': { border: 0 }
//                       }}
//                     >
//                       {/* Project Column */}
//                       <TableCell sx={tableCellStyles}>
//                         <Box display="flex" alignItems="flex-start" gap={2}>
//                           <Avatar 
//                             src={product.images[0]} 
//                             variant="rounded"
//                             sx={{ 
//                               width: { xs: 50, sm: 60 }, 
//                               height: { xs: 50, sm: 60 },
//                               display: { xs: 'none', sm: 'flex' }
//                             }}
//                           >
//                             {getCategoryIcon(product.categoryName)}
//                           </Avatar>
//                           <Box sx={{ width: '100%' }}>
//                             <Typography variant="body1" fontWeight="medium" sx={{ 
//                               fontSize: { xs: '0.875rem', sm: '1rem' },
//                               lineHeight: 1.3
//                             }}>
//                               {product.name}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary" sx={{ 
//                               fontSize: { xs: '0.7rem', sm: '0.875rem' },
//                               lineHeight: 1.4,
//                               mt: 0.5,
//                               display: { xs: 'none', sm: 'block' }
//                             }}>
//                               {product.description.substring(0, 60)}...
//                             </Typography>
//                             <Box display="flex" gap={1} mt={0.5} flexWrap="wrap">
//                               <Chip 
//                                 label={product.dimensions} 
//                                 size="small" 
//                                 variant="outlined" 
//                                 sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
//                               />
//                               <Chip 
//                                 label={product.style} 
//                                 size="small" 
//                                 variant="outlined"
//                                 sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
//                               />
//                             </Box>
//                           </Box>
//                         </Box>
//                       </TableCell>

//                       {/* SKU Column */}
//                       <TableCell sx={tableCellStyles}>
//                         <Chip 
//                           label={product.sku} 
//                           size="small" 
//                           color={getCategoryColor(product.categoryName)}
//                           sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
//                         />
//                       </TableCell>

//                       {/* Price Column */}
//                       <TableCell sx={tableCellStyles}>
//                         <Typography variant="body1" fontWeight="bold" color="primary" sx={{ 
//                           fontSize: { xs: '0.875rem', sm: '1rem' }
//                         }}>
//                           {formatCurrency(product.price)}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary" display="block" sx={{ 
//                           fontSize: { xs: '0.65rem', sm: '0.75rem' }
//                         }}>
//                           Cost: {formatCurrency(product.cost)}
//                         </Typography>
//                       </TableCell>

//                       {/* Stock Column */}
//                       <TableCell sx={tableCellStyles}>
//                         <Chip
//                           label={product.stock}
//                           color={product.stock < 3 ? 'error' : product.stock < 5 ? 'warning' : 'success'}
//                           size="small"
//                           sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
//                         />
//                       </TableCell>

//                       {/* Category Column */}
//                       <TableCell sx={tableCellStyles}>
//                         <Box display="flex" alignItems="center" gap={1}>
//                           <Avatar sx={{ 
//                             bgcolor: `${getCategoryColor(product.categoryName)}.light`, 
//                             width: { xs: 28, sm: 32 }, 
//                             height: { xs: 28, sm: 32 },
//                             fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                             display: { xs: 'none', sm: 'flex' }
//                           }}>
//                             {getCategoryIcon(product.categoryName)}
//                           </Avatar>
//                           <Box>
//                             <Chip
//                               label={product.categoryName}
//                               size="small"
//                               color={getCategoryColor(product.categoryName)}
//                               sx={{ 
//                                 mb: 0.5,
//                                 fontSize: { xs: '0.7rem', sm: '0.75rem' }
//                               }}
//                             />
//                             <Typography variant="caption" display="block" color="text.secondary" sx={{ 
//                               fontSize: { xs: '0.65rem', sm: '0.75rem' }
//                             }}>
//                               {product.subcategoryName}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>

//                       {/* Rating Column */}
//                       <TableCell sx={tableCellStyles}>
//                         <Box display="flex" alignItems="center" gap={1}>
//                           <Rating 
//                             value={product.rating} 
//                             readOnly 
//                             size={isMobile ? "small" : "medium"}
//                           />
//                           <Typography variant="body2" sx={{ 
//                             fontSize: { xs: '0.75rem', sm: '0.875rem' }
//                           }}>
//                             {product.rating.toFixed(1)}
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       {/* Status Column */}
//                       <TableCell sx={tableCellStyles}>
//                         <Chip
//                           label={product.isActive ? 'Active' : 'Inactive'}
//                           color={product.isActive ? 'success' : 'error'}
//                           size="small"
//                           sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
//                         />
//                       </TableCell>

//                       {/* Actions Column */}
//                       <TableCell align="center" sx={tableCellStyles}>
//                         <Box display="flex" justifyContent="center" gap={1}>
//                           <Tooltip title="View Details">
//                             <IconButton
//                               color="info"
//                               size={isMobile ? "small" : "medium"}
//                               component={Link}
//                               to={`/products/${product.id}`}
//                             >
//                               <ViewIcon fontSize={isMobile ? "small" : "medium"} />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Edit">
//                             <IconButton
//                               color="primary"
//                               size={isMobile ? "small" : "medium"}
//                               onClick={() => handleOpenDialog(product)}
//                             >
//                               <EditIcon fontSize={isMobile ? "small" : "medium"} />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete">
//                             <IconButton
//                               color="error"
//                               size={isMobile ? "small" : "medium"}
//                               onClick={() => handleDelete(product.id)}
//                             >
//                               <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Add/Edit Project Dialog */}
//       <Dialog 
//         open={openDialog} 
//         onClose={handleCloseDialog} 
//         maxWidth="md" 
//         fullWidth
//         fullScreen={isMobile}
//       >
//         <DialogTitle sx={{ py: { xs: 2, sm: 2 } }}>
//           <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
//             {editingProduct ? 'Edit Project' : 'Add New Project'}
//           </Typography>
//         </DialogTitle>
//         <DialogContent dividers sx={{ py: { xs: 2, sm: 3 } }}>
//           <Box sx={{ 
//             display: 'flex', 
//             flexDirection: 'column', 
//             gap: { xs: 2, sm: 3 },
//             width: '100%'
//           }}>
//             {/* Project Name and SKU */}
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: { xs: 'column', sm: 'row' },
//               gap: { xs: 2, sm: 2 }
//             }}>
//               <TextField
//                 fullWidth
//                 label="Project Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 required
//                 size={isMobile ? "small" : "medium"}
//                 sx={{ flex: 1 }}
//               />
//               <TextField
//                 fullWidth
//                 label="SKU"
//                 name="sku"
//                 value={formData.sku}
//                 onChange={handleInputChange}
//                 required
//                 size={isMobile ? "small" : "medium"}
//                 sx={{ flex: 1 }}
//               />
//             </Box>

//             {/* Description */}
//             <TextField
//               fullWidth
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               multiline
//               rows={isMobile ? 3 : 4}
//               size={isMobile ? "small" : "medium"}
//             />

//             {/* Categories */}
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: { xs: 'column', sm: 'row' },
//               gap: { xs: 2, sm: 2 }
//             }}>
//               <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   name="categoryId"
//                   value={formData.categoryId}
//                   onChange={handleSelectChange}
//                   label="Category"
//                 >
//                   {categories.map(category => (
//                     <MenuItem key={category.id} value={category.id}>
//                       {category.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
//                 <InputLabel>Subcategory</InputLabel>
//                 <Select
//                   name="subcategoryId"
//                   value={formData.subcategoryId}
//                   onChange={handleSelectChange}
//                   label="Subcategory"
//                 >
//                   {filteredSubcategories.map(subcategory => (
//                     <MenuItem key={subcategory.id} value={subcategory.id}>
//                       {subcategory.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>

//             {/* Project Specifications */}
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: { xs: 'column', sm: 'row' },
//               gap: { xs: 2, sm: 2 }
//             }}>
//               <TextField
//                 fullWidth
//                 label="Dimensions"
//                 name="dimensions"
//                 value={formData.dimensions}
//                 onChange={handleInputChange}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{ flex: 1 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Material"
//                 name="material"
//                 value={formData.material}
//                 onChange={handleInputChange}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{ flex: 1 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Style"
//                 name="style"
//                 value={formData.style}
//                 onChange={handleInputChange}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{ flex: 1 }}
//               />
//             </Box>

//             {/* Pricing */}
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: { xs: 'column', sm: 'row' },
//               gap: { xs: 2, sm: 2 }
//             }}>
//               <TextField
//                 fullWidth
//                 label="Price (INR)"
//                 name="price"
//                 type="number"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 required
//                 size={isMobile ? "small" : "medium"}
//                 InputProps={{
//                   startAdornment: <span>₹</span>,
//                 }}
//                 sx={{ flex: 1 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Cost (INR)"
//                 name="cost"
//                 type="number"
//                 value={formData.cost}
//                 onChange={handleInputChange}
//                 required
//                 size={isMobile ? "small" : "medium"}
//                 InputProps={{
//                   startAdornment: <span>₹</span>,
//                 }}
//                 sx={{ flex: 1 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Stock"
//                 name="stock"
//                 type="number"
//                 value={formData.stock}
//                 onChange={handleInputChange}
//                 required
//                 size={isMobile ? "small" : "medium"}
//                 sx={{ flex: 1 }}
//               />
//             </Box>

//             {/* Status */}
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={formData.isActive}
//                   onChange={handleSwitchChange}
//                   color="primary"
//                   size={isMobile ? "small" : "medium"}
//                 />
//               }
//               label="Active Project"
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ 
//           px: { xs: 2, sm: 3 }, 
//           py: { xs: 2, sm: 2 },
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 1, sm: 0 }
//         }}>
//           <Button 
//             onClick={handleCloseDialog} 
//             color="inherit"
//             size={isMobile ? "medium" : "medium"}
//             sx={{ width: { xs: '100%', sm: 'auto' } }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSubmit} 
//             variant="contained"
//             size={isMobile ? "medium" : "medium"}
//             sx={{ width: { xs: '100%', sm: 'auto' } }}
//           >
//             {editingProduct ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }




// Products.tsx - UPDATED VERSION WITHOUT SKU, PRICE, RATING
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Tooltip,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Home as HomeIcon,
  DesignServices as DesignIcon,
  LocationCity as CityIcon,
  MenuBook as MagazineIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Interior Design Categories
const categories = [
  { id: 'cat-1', name: 'Design Ideas' },
  { id: 'cat-2', name: 'Magazine' },
  { id: 'cat-3', name: 'Cities' },
  { id: 'cat-4', name: 'Projects' },
];

// Interior Design Subcategories
const subcategories = [
  { id: 'sub-1', name: 'Modular Kitchen Designs', categoryId: 'cat-1' },
  { id: 'sub-2', name: 'Wardrobe Designs', categoryId: 'cat-1' },
  { id: 'sub-3', name: 'Bathroom Designs', categoryId: 'cat-1' },
  { id: 'sub-4', name: 'Living Room Designs', categoryId: 'cat-1' },
  { id: 'sub-5', name: 'Room Ideas', categoryId: 'cat-2' },
  { id: 'sub-6', name: 'Home Decor', categoryId: 'cat-2' },
  { id: 'sub-7', name: 'Ahmedabad', categoryId: 'cat-3' },
  { id: 'sub-8', name: 'Mumbai', categoryId: 'cat-3' },
];

// Interior Design Projects
const initialProducts = [
  {
    id: 'proj-1',
    name: 'Modern Modular Kitchen',
    description: 'Contemporary modular kitchen with smart storage solutions',
    sku: 'KITCHEN-MOD-001',
    price: 250000,
    cost: 180000,
    stock: 5,
    categoryId: 'cat-1',
    subcategoryId: 'sub-1',
    categoryName: 'Design Ideas',
    subcategoryName: 'Modular Kitchen Designs',
    isActive: true,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
    dimensions: '10ft x 12ft',
    material: 'Wood & Glass',
    style: 'Modern',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    rating: 4.5,
  },
  {
    id: 'proj-2',
    name: 'Walk-in Wardrobe',
    description: 'Luxury walk-in wardrobe with custom compartments',
    sku: 'WARDROBE-WI-002',
    price: 180000,
    cost: 120000,
    stock: 8,
    categoryId: 'cat-1',
    subcategoryId: 'sub-2',
    categoryName: 'Design Ideas',
    subcategoryName: 'Wardrobe Designs',
    isActive: true,
    images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400'],
    dimensions: '8ft x 10ft',
    material: 'Plywood & Mirrors',
    style: 'Contemporary',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
    rating: 4.8,
  },
  {
    id: 'proj-3',
    name: 'Luxury Bathroom Suite',
    description: 'Premium bathroom with modern fixtures and marble finish',
    sku: 'BATH-LUX-003',
    price: 350000,
    cost: 250000,
    stock: 3,
    categoryId: 'cat-1',
    subcategoryId: 'sub-3',
    categoryName: 'Design Ideas',
    subcategoryName: 'Bathroom Designs',
    isActive: true,
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w-400'],
    dimensions: '12ft x 15ft',
    material: 'Marble & Ceramic',
    style: 'Luxury',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17',
    rating: 4.7,
  },
  {
    id: 'proj-4',
    name: 'Ahmedabad Villa Project',
    description: 'Complete interior design for villa in Ahmedabad',
    sku: 'CITY-AHM-004',
    price: 1200000,
    cost: 850000,
    stock: 2,
    categoryId: 'cat-3',
    subcategoryId: 'sub-7',
    categoryName: 'Cities',
    subcategoryName: 'Ahmedabad',
    isActive: true,
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400'],
    dimensions: '3000 sq ft',
    material: 'Various',
    style: 'Modern Indian',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    rating: 4.9,
  },
];

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [products, setProducts] = useState(initialProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    price: 0,
    cost: 0,
    stock: 0,
    categoryId: categories[0]?.id || '',
    subcategoryId: '',
    isActive: true,
    images: [''],
    dimensions: '',
    material: '',
    style: '',
  });
  const [filteredSubcategories, setFilteredSubcategories] = useState<any[]>([]);

  useEffect(() => {
    if (formData.categoryId) {
      const filtered = subcategories.filter(
        sub => sub.categoryId === formData.categoryId
      );
      setFilteredSubcategories(filtered);
      if (filtered.length > 0 && !formData.subcategoryId) {
        setFormData(prev => ({ ...prev, subcategoryId: filtered[0].id }));
      }
    }
  }, [formData.categoryId, subcategories]);

  const handleOpenDialog = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price,
        cost: product.cost,
        stock: product.stock,
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId,
        isActive: product.isActive,
        images: product.images,
        dimensions: product.dimensions,
        material: product.material,
        style: product.style,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        sku: '',
        price: 0,
        cost: 0,
        stock: 0,
        categoryId: categories[0]?.id || '',
        subcategoryId: filteredSubcategories[0]?.id || '',
        isActive: true,
        images: [''],
        dimensions: '',
        material: '',
        style: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  const handleSubmit = () => {
    const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
    const selectedSubcategory = subcategories.find(sub => sub.id === formData.subcategoryId);

    if (editingProduct) {
      // Update existing product
      setProducts(prev =>
        prev.map(prod =>
          prod.id === editingProduct.id
            ? {
                ...prod,
                ...formData,
                categoryName: selectedCategory?.name || '',
                subcategoryName: selectedSubcategory?.name || '',
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : prod
        )
      );
    } else {
      // Add new product
      const newProduct = {
        id: `proj-${products.length + 1}`,
        ...formData,
        categoryName: selectedCategory?.name || '',
        subcategoryName: selectedSubcategory?.name || '',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        rating: 4.0,
      };
      setProducts(prev => [...prev, newProduct]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProducts(prev => prev.filter(prod => prod.id !== id));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Design Ideas': return <DesignIcon />;
      case 'Magazine': return <MagazineIcon />;
      case 'Cities': return <CityIcon />;
      case 'Projects': return <HomeIcon />;
      default: return <HomeIcon />;
    }
  };

  const getCategoryColor = (categoryName: string) => {
    switch (categoryName) {
      case 'Design Ideas': return 'primary';
      case 'Magazine': return 'secondary';
      case 'Cities': return 'info';
      case 'Projects': return 'success';
      default: return 'default';
    }
  };

  // Responsive table cell styling
  const tableCellStyles = {
    py: { xs: 1, sm: 1.5 },
    px: { xs: 1, sm: 2 },
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    minWidth: { xs: '120px', sm: 'auto' },
  };

  // Determine minWidth for table based on screen size
  const getTableMinWidth = () => {
    if (isMobile) return '600px';
    if (isTablet) return '700px';
    return '800px';
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Main Content Container */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        p: { xs: 1, sm: 2, md: 3 },
      }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
          mb: 3,
          flexShrink: 0,
        }}>
          <Box display="flex" alignItems="center" gap={2}>
            <HomeIcon sx={{ 
              fontSize: { xs: 24, sm: 28, md: 32 }, 
              color: 'primary.main' 
            }} />
            <Typography variant="h4" sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
              lineHeight: 1.2
            }}>
              Interior Design Projects
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              minWidth: { xs: 'auto', sm: '140px' },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            {isMobile ? 'Add Service ' : 'Add New Project'}
          </Button>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ 
          mb: 3, 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          flexShrink: 0,
        }}>
          <Button
            component={Link}
            to="/products/categories"
            variant="outlined"
            startIcon={<DesignIcon />}
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              flex: { xs: '1 1 auto', sm: '0 1 auto' },
              minWidth: { xs: '140px', sm: 'auto' },
              width: { xs: 'calc(50% - 8px)', sm: 'auto' }
            }}
          >
            {isMobile ? 'Categories' : 'Design Categories'}
          </Button>
          <Button
            component={Link}
            to="/products/subcategories"
            variant="outlined"
            startIcon={<DesignIcon />}
            size={isMobile ? 'small' : 'medium'}
            sx={{ 
              flex: { xs: '1 1 auto', sm: '0 1 auto' },
              minWidth: { xs: '140px', sm: 'auto' },
              width: { xs: 'calc(50% - 8px)', sm: 'auto' }
            }}
          >
            {isMobile ? 'Subcategories' : 'Design Subcategories'}
          </Button>
        </Box>

        {/* Scrollable Table Container */}
        <Card elevation={3} sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 2,
        }}>
          <CardContent sx={{ 
            p: 0,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            '&:last-child': { pb: 0 }
          }}>
            {/* Table Container with Isolated Scrolling */}
            <Box sx={{ 
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
            }}>
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: 6,
                  height: 6,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'grey.100',
                  borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'grey.400',
                  borderRadius: 3,
                  '&:hover': {
                    backgroundColor: 'grey.500',
                  }
                },
              }}>
                <TableContainer sx={{ 
                  minWidth: getTableMinWidth(),
                  width: '100%',
                }}>
                  <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'grey.50' }}>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 },
                          minWidth: 250,
                          position: 'sticky',
                          left: 0,
                          backgroundColor: 'grey.50',
                          zIndex: 10,
                          boxShadow: '2px 0 4px -2px rgba(0,0,0,0.1)',
                        }}>
                          Project
                        </TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 },
                          minWidth: 100
                        }}>
                          Stock
                        </TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 },
                          minWidth: 180
                        }}>
                          Category
                        </TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 },
                          minWidth: 100
                        }}>
                          Status
                        </TableCell>
                        <TableCell align="center" sx={{ 
                          fontWeight: 'bold', 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          py: { xs: 1, sm: 1.5 },
                          px: { xs: 1, sm: 2 },
                          minWidth: 120,
                          position: 'sticky',
                          right: 0,
                          backgroundColor: 'grey.50',
                          zIndex: 10,
                          boxShadow: '-2px 0 4px -2px rgba(0,0,0,0.1)',
                        }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product, index) => (
                        <TableRow 
                          key={product.id}
                          sx={{ 
                            '&:hover': { backgroundColor: 'action.hover' },
                            '&:last-child td, &:last-child th': { border: 0 },
                            backgroundColor: index % 2 === 0 ? 'white' : 'grey.50'
                          }}
                        >
                          {/* Project Column */}
                          <TableCell sx={{
                            ...tableCellStyles,
                            position: 'sticky',
                            left: 0,
                            backgroundColor: index % 2 === 0 ? 'white' : 'grey.50',
                            zIndex: 9,
                            boxShadow: '2px 0 4px -2px rgba(0,0,0,0.1)',
                          }}>
                            <Box display="flex" alignItems="flex-start" gap={2}>
                              <Avatar 
                                src={product.images[0]} 
                                variant="rounded"
                                sx={{ 
                                  width: { xs: 40, sm: 50, md: 60 }, 
                                  height: { xs: 40, sm: 50, md: 60 },
                                  display: { xs: 'none', sm: 'flex' }
                                }}
                              >
                                {getCategoryIcon(product.categoryName)}
                              </Avatar>
                              <Box sx={{ width: '100%' }}>
                                <Typography variant="body1" fontWeight="medium" sx={{ 
                                  fontSize: { xs: '0.875rem', sm: '1rem' },
                                  lineHeight: 1.3
                                }}>
                                  {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ 
                                  fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                  lineHeight: 1.4,
                                  mt: 0.5,
                                  display: { xs: 'none', sm: 'block' }
                                }}>
                                  {product.description.substring(0, isMobile ? 40 : 60)}...
                                </Typography>
                                <Box display="flex" gap={1} mt={0.5} flexWrap="wrap">
                                  <Chip 
                                    label={product.dimensions} 
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ 
                                      fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                      height: { xs: 20, sm: 24 }
                                    }}
                                  />
                                  <Chip 
                                    label={product.style} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ 
                                      fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                      height: { xs: 20, sm: 24 }
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </TableCell>

                          {/* Stock Column */}
                          <TableCell sx={tableCellStyles}>
                            <Chip
                              label={product.stock}
                              color={product.stock < 3 ? 'error' : product.stock < 5 ? 'warning' : 'success'}
                              size="small"
                              sx={{ 
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                height: { xs: 20, sm: 24 },
                                minWidth: { xs: 40, sm: 50 }
                              }}
                            />
                          </TableCell>

                          {/* Category Column */}
                          <TableCell sx={tableCellStyles}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Avatar sx={{ 
                                bgcolor: `${getCategoryColor(product.categoryName)}.light`, 
                                width: { xs: 24, sm: 28, md: 32 }, 
                                height: { xs: 24, sm: 28, md: 32 },
                                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                                display: { xs: 'none', sm: 'flex' }
                              }}>
                                {getCategoryIcon(product.categoryName)}
                              </Avatar>
                              <Box>
                                <Chip
                                  label={product.categoryName}
                                  size="small"
                                  color={getCategoryColor(product.categoryName)}
                                  sx={{ 
                                    mb: 0.5,
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    height: { xs: 20, sm: 24 }
                                  }}
                                />
                                <Typography variant="caption" display="block" color="text.secondary" sx={{ 
                                  fontSize: { xs: '0.65rem', sm: '0.75rem' }
                                }}>
                                  {product.subcategoryName}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>

                          {/* Status Column */}
                          <TableCell sx={tableCellStyles}>
                            <Chip
                              label={product.isActive ? 'Active' : 'Inactive'}
                              color={product.isActive ? 'success' : 'error'}
                              size="small"
                              sx={{ 
                                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                height: { xs: 20, sm: 24 }
                              }}
                            />
                          </TableCell>

                          {/* Actions Column */}
                          <TableCell align="center" sx={{
                            ...tableCellStyles,
                            position: 'sticky',
                            right: 0,
                            backgroundColor: index % 2 === 0 ? 'white' : 'grey.50',
                            zIndex: 9,
                            boxShadow: '-2px 0 4px -2px rgba(0,0,0,0.1)',
                          }}>
                            <Box display="flex" justifyContent="center" gap={1}>
                              <Tooltip title="View Details">
                                <IconButton
                                  color="info"
                                  size={isMobile ? "small" : "medium"}
                                  component={Link}
                                  to={`/products/${product.id}`}
                                  sx={{ 
                                    width: { xs: 32, sm: 40 },
                                    height: { xs: 32, sm: 40 }
                                  }}
                                >
                                  <ViewIcon fontSize={isMobile ? "small" : "medium"} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton
                                  color="primary"
                                  size={isMobile ? "small" : "medium"}
                                  onClick={() => handleOpenDialog(product)}
                                  sx={{ 
                                    width: { xs: 32, sm: 40 },
                                    height: { xs: 32, sm: 40 }
                                  }}
                                >
                                  <EditIcon fontSize={isMobile ? "small" : "medium"} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  color="error"
                                  size={isMobile ? "small" : "medium"}
                                  onClick={() => handleDelete(product.id)}
                                  sx={{ 
                                    width: { xs: 32, sm: 40 },
                                    height: { xs: 32, sm: 40 }
                                  }}
                                >
                                  <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Add/Edit Project Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 0, sm: 2 },
            width: { xs: '100%', sm: 'calc(100% - 32px)' },
            maxWidth: { xs: '100%', sm: 800 },
            maxHeight: { xs: '100%', sm: 'calc(100% - 64px)' }
          }
        }}
      >
        <DialogTitle sx={{ py: { xs: 2, sm: 2 } }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            {editingProduct ? 'Edit Project' : 'Add New Project'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ py: { xs: 2, sm: 3 } }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: { xs: 2, sm: 3 },
            width: '100%'
          }}>
            {/* Project Name and SKU */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 2 }
            }}>
              <TextField
                fullWidth
                label="Project Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
              <TextField
                fullWidth
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                required
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Description */}
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={isMobile ? 3 : 4}
              size={isMobile ? "small" : "medium"}
            />

            {/* Categories */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 2 }
            }}>
              <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleSelectChange}
                  label="Category"
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  name="subcategoryId"
                  value={formData.subcategoryId}
                  onChange={handleSelectChange}
                  label="Subcategory"
                >
                  {filteredSubcategories.map(subcategory => (
                    <MenuItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Project Specifications */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 2 }
            }}>
              <TextField
                fullWidth
                label="Dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
              <TextField
                fullWidth
                label="Material"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
              <TextField
                fullWidth
                label="Style"
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Pricing */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 2 }
            }}>
              <TextField
                fullWidth
                label="Price (INR)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  startAdornment: <span>₹</span>,
                }}
                sx={{ flex: 1 }}
              />
              <TextField
                fullWidth
                label="Cost (INR)"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleInputChange}
                required
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  startAdornment: <span>₹</span>,
                }}
                sx={{ flex: 1 }}
              />
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                required
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1 }}
              />
            </Box>

            {/* Status */}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={handleSwitchChange}
                  color="primary"
                  size={isMobile ? "small" : "medium"}
                />
              }
              label="Active Project"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          px: { xs: 2, sm: 3 }, 
          py: { xs: 2, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Button 
            onClick={handleCloseDialog} 
            color="inherit"
            size={isMobile ? "medium" : "medium"}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            size={isMobile ? "medium" : "medium"}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            {editingProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}