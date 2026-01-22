// import React, { useState } from 'react';
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
//   Tooltip,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Category as CategoryIcon,
// } from '@mui/icons-material';

// // Interior Design Categories
// const initialCategories = [
//   {
//     id: 'cat-1',
//     name: 'Design Ideas',
//     description: 'Interior design concepts and inspiration',
//     createdAt: '2024-01-15',
//     updatedAt: '2024-01-15',
//   },
//   {
//     id: 'cat-2',
//     name: 'Magazine',
//     description: 'Design publications and articles',
//     createdAt: '2024-01-16',
//     updatedAt: '2024-01-16',
//   },
//   {
//     id: 'cat-3',
//     name: 'Cities',
//     description: 'Interior projects by city',
//     createdAt: '2024-01-17',
//     updatedAt: '2024-01-17',
//   },
//   {
//     id: 'cat-4',
//     name: 'Projects',
//     description: 'Complete interior design projects',
//     createdAt: '2024-01-18',
//     updatedAt: '2024-01-18',
//   },
// ];

// export default function Categories() {
//   const [categories, setCategories] = useState(initialCategories);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<any>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//   });

//   const handleOpenDialog = (category: any = null) => {
//     if (category) {
//       setEditingCategory(category);
//       setFormData({
//         name: category.name,
//         description: category.description,
//       });
//     } else {
//       setEditingCategory(null);
//       setFormData({
//         name: '',
//         description: '',
//       });
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingCategory(null);
//     setFormData({ name: '', description: '' });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (editingCategory) {
//       // Update existing category
//       setCategories(prev =>
//         prev.map(cat =>
//           cat.id === editingCategory.id
//             ? {
//                 ...cat,
//                 ...formData,
//                 updatedAt: new Date().toISOString().split('T')[0],
//               }
//             : cat
//         )
//       );
//     } else {
//       // Add new category
//       const newCategory = {
//         id: `cat-${categories.length + 1}`,
//         ...formData,
//         createdAt: new Date().toISOString().split('T')[0],
//         updatedAt: new Date().toISOString().split('T')[0],
//       };
//       setCategories(prev => [...prev, newCategory]);
//     }
//     handleCloseDialog();
//   };

//   const handleDelete = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this category?')) {
//       setCategories(prev => prev.filter(cat => cat.id !== id));
//     }
//   };

//   const getCategoryColor = (name: string) => {
//     switch (name) {
//       case 'Design Ideas': return 'primary';
//       case 'Magazine': return 'secondary';
//       case 'Cities': return 'info';
//       case 'Projects': return 'success';
//       default: return 'default';
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Box display="flex" alignItems="center" gap={2}>
//           <CategoryIcon sx={{ fontSize: 32, color: 'primary.main' }} />
//           <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
//             Design Categories
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => handleOpenDialog()}
//           size="medium"
//         >
//           Add Category
//         </Button>
//       </Box>

//       <Card elevation={3}>
//         <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
//           <TableContainer component={Paper} elevation={0}>
//             <Table sx={{ minWidth: 650 }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>ID</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Category</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Description</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Created</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Updated</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {categories.map(category => (
//                   <TableRow 
//                     key={category.id}
//                     sx={{ 
//                       '&:hover': { backgroundColor: 'action.hover' },
//                       '&:last-child td, &:last-child th': { border: 0 }
//                     }}
//                   >
//                     <TableCell>
//                       <Chip 
//                         label={category.id} 
//                         size="small" 
//                         variant="outlined" 
//                         color={getCategoryColor(category.name)}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <Chip 
//                           icon={<CategoryIcon />}
//                           label={category.name}
//                           color={getCategoryColor(category.name)}
//                           size="medium"
//                         />
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
//                         {category.description}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="caption" color="text.secondary">
//                         {category.createdAt}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="caption" color="text.secondary">
//                         {category.updatedAt}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" justifyContent="center" gap={1}>
//                         <Tooltip title="Edit">
//                           <IconButton
//                             color="primary"
//                             size="small"
//                             onClick={() => handleOpenDialog(category)}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton
//                             color="error"
//                             size="small"
//                             onClick={() => handleDelete(category.id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           <Typography variant="h6">
//             {editingCategory ? 'Edit Category' : 'Add New Category'}
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ pt: 2 }}>
//             <TextField
//               fullWidth
//               label="Category Name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               margin="normal"
//               required
//               size="small"
//             />
//             <TextField
//               fullWidth
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               margin="normal"
//               multiline
//               rows={3}
//               size="small"
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="inherit">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} variant="contained">
//             {editingCategory ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }




// // Categories.tsx - CLEANED UP VERSION
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
//   Tooltip,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Avatar,
//   Badge,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Category as CategoryIcon,
//   CheckCircle,
//   Cancel,
// } from '@mui/icons-material';
// import { SectionAPI } from '../../api/section.api'

// interface Category {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   status: string;
//   image_path: string;
//   subCategories: any[];
//   home_category: string;
// }

// export default function Categories() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success' as 'success' | 'error',
//   });

//   // Fetch categories on component mount
//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     try {
//       setLoading(true);
//       console.log('📡 Loading categories from API...');
      
//       const response = await SectionAPI.getAll();
//       console.log('📦 API Response:', response);
      
//       if (response.status && response.result) {
//         // Transform API data to match your interface
//         const transformedCategories = response.result.map((item: any) => ({
//           id: item.id,
//           name: item.name,
//           description: item.languageName || item.langDescrption || '',
//           createdAt: '2024-01-01', // Add actual date if available
//           updatedAt: '2024-01-01',
//           status: item.status || 'YES',
//           image_path: item.image_path || '',
//           subCategories: item.categories || [],
//           home_category: item.home_category || 'NO',
//         }));
        
//         console.log(`✅ Loaded ${transformedCategories.length} categories`);
//         setCategories(transformedCategories);
//       } else {
//         console.error('Unexpected API response structure:', response);
//         showSnackbar('Invalid API response format', 'error');
//       }
//     } catch (error: any) {
//       console.error('❌ Error loading categories:', error);
      
//       // Detailed error messages
//       if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
//         showSnackbar(
//           `Cannot connect to API server. Check: 
//           1. Is apitaskmgt.biyss.com running?
//           2. CORS enabled on backend?
//           3. Try opening http://apitaskmgt.biyss.com/Section/list in browser`,
//           'error'
//         );
//       } else if (error.response?.status === 404) {
//         showSnackbar('API endpoint not found (404). Check backend routes.', 'error');
//       } else if (error.response?.status === 500) {
//         showSnackbar('Server error (500). Check backend logs.', 'error');
//       } else {
//         showSnackbar(`Failed to load: ${error.message}`, 'error');
//       }
      
//       // Fallback sample data for UI testing
//       setCategories([
//         {
//           id: '1',
//           name: 'Chicken',
//           description: 'Fresh chicken products',
//           createdAt: '2024-01-15',
//           updatedAt: '2024-01-15',
//           status: 'YES',
//           image_path: 'https://lambigo.awidev.com/api/writable/uploads/images/section/1_5.png',
//           subCategories: [
//             { id: '1', name: 'Chicken Skinless', image_path: 'https://lambigo.awidev.com/api/writable/uploads/images/category/1_5.jpg' },
//             { id: '2', name: 'Chicken Skin-On', image_path: 'https://lambigo.awidev.com/api/writable/uploads/images/category/2_2.jpg' },
//           ],
//           home_category: 'NO',
//         },
//         {
//           id: '2',
//           name: 'Mutton',
//           description: 'Fresh mutton products',
//           createdAt: '2024-01-16',
//           updatedAt: '2024-01-16',
//           status: 'YES',
//           image_path: 'https://lambigo.awidev.com/api/writable/uploads/images/section/2_3.png',
//           subCategories: [],
//           home_category: 'NO',
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenDialog = (category: Category | null = null) => {
//     if (category) {
//       setEditingCategory(category);
//       setFormData({
//         name: category.name,
//         description: category.description,
//       });
//     } else {
//       setEditingCategory(null);
//       setFormData({
//         name: '',
//         description: '',
//       });
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingCategory(null);
//     setFormData({ name: '', description: '' });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!formData.name.trim()) {
//       showSnackbar('Category name is required', 'error');
//       return;
//     }

//     try {
//       setSubmitting(true);
      
//       if (editingCategory) {
//         await SectionAPI.update(editingCategory.id, formData);
//         setCategories(prev => prev.map(cat => 
//           cat.id === editingCategory.id 
//             ? { ...cat, ...formData, updatedAt: new Date().toISOString().split('T')[0] } 
//             : cat
//         ));
//         showSnackbar('Category updated successfully', 'success');
//       } else {
//         const response = await SectionAPI.create(formData);
//         const newCategory: Category = {
//           id: response.id || `cat-${Date.now()}`,
//           name: formData.name,
//           description: formData.description,
//           createdAt: new Date().toISOString().split('T')[0],
//           updatedAt: new Date().toISOString().split('T')[0],
//           status: 'YES',
//           image_path: '',
//           subCategories: [],
//           home_category: 'NO',
//         };
//         setCategories(prev => [...prev, newCategory]);
//         showSnackbar('Category created successfully', 'success');
//       }
//       handleCloseDialog();
//     } catch (error: any) {
//       console.error('Error saving category:', error);
//       showSnackbar(error.response?.data?.message || 'Failed to save category', 'error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return;
    
//     try {
//       await SectionAPI.delete(id);
//       setCategories(prev => prev.filter(cat => cat.id !== id));
//       showSnackbar('Category deleted successfully', 'success');
//     } catch (error: any) {
//       console.error('Error deleting category:', error);
//       showSnackbar(error.response?.data?.message || 'Failed to delete category', 'error');
//     }
//   };

//   const toggleStatus = async (id: string) => {
//     try {
//       const category = categories.find(c => c.id === id);
//       if (!category) return;
      
//       const newStatus = category.status === 'YES' ? 'NO' : 'YES';
//       await SectionAPI.update(id, { status: newStatus });
      
//       setCategories(prev => prev.map(cat => 
//         cat.id === id ? { ...cat, status: newStatus } : cat
//       ));
//       showSnackbar(`Status updated to ${newStatus}`, 'success');
//     } catch (error) {
//       console.error('Error toggling status:', error);
//       showSnackbar('Failed to update status', 'error');
//     }
//   };

//   const showSnackbar = (message: string, severity: 'success' | 'error') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading categories from API...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Box display="flex" alignItems="center" gap={2}>
//           <CategoryIcon sx={{ fontSize: 32, color: 'primary.main' }} />
//           <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
//             Categories ({categories.length})
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => handleOpenDialog()}
//           size="medium"
//         >
//           Add Category
//         </Button>
//       </Box>

//       <Card elevation={3}>
//         <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
//           <TableContainer component={Paper} elevation={0}>
//             <Table sx={{ minWidth: 650 }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Sub-Categories</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Home Category</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {categories.map(category => (
//                   <TableRow key={category.id} hover>
//                     <TableCell>
//                       <Avatar 
//                         src={category.image_path} 
//                         alt={category.name}
//                         sx={{ width: 56, height: 56 }}
//                       >
//                         <CategoryIcon />
//                       </Avatar>
//                     </TableCell>
//                     <TableCell>
//                       <Typography fontWeight="medium">{category.name}</Typography>
//                       <Typography variant="caption" color="text.secondary">ID: {category.id}</Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2">
//                         {category.description || 'No description'}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={`${category.subCategories.length} items`}
//                         size="small"
//                         color={category.subCategories.length > 0 ? "info" : "default"}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         icon={category.status === 'YES' ? <CheckCircle /> : <Cancel />}
//                         label={category.status}
//                         color={category.status === 'YES' ? "success" : "error"}
//                         onClick={() => toggleStatus(category.id)}
//                         clickable
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={category.home_category}
//                         color={category.home_category === 'YES' ? "primary" : "default"}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" justifyContent="center" gap={1}>
//                         <Tooltip title="Edit">
//                           <IconButton
//                             color="primary"
//                             size="small"
//                             onClick={() => handleOpenDialog(category)}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton
//                             color="error"
//                             size="small"
//                             onClick={() => handleDelete(category.id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           <Typography variant="h6">
//             {editingCategory ? 'Edit Category' : 'Add New Category'}
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ pt: 2 }}>
//             <TextField
//               fullWidth
//               label="Category Name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               margin="normal"
//               required
//               disabled={submitting}
//             />
//             <TextField
//               fullWidth
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               margin="normal"
//               multiline
//               rows={3}
//               disabled={submitting}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} disabled={submitting}>Cancel</Button>
//           <Button 
//             onClick={handleSubmit} 
//             variant="contained" 
//             disabled={submitting || !formData.name.trim()}
//           >
//             {submitting ? <CircularProgress size={24} /> : editingCategory ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


// Categories.tsx - COMPLETE FIXED VERSION WITH CRUD
import React, { useState, useEffect, useRef } from 'react';
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
  Tooltip,
  CircularProgress,
  Alert,
  Snackbar,
  Avatar,
  Switch,
  FormControlLabel,
  FormGroup,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
  CheckCircle,
  Cancel,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Home as HomeIcon,
  CloudUpload as UploadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { SectionAPI } from '../../api/section.api';

// Define interfaces
interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'YES' | 'NO';
  image_path: string;
  subCategories: any[];
  home_category: 'YES' | 'NO';
  store_category_id: string;
}

interface FormData {
  id?: string;
  name: string;
  description?: string;
  status?: 'YES' | 'NO';
  home_category?: 'YES' | 'NO';
  image_path?: string;
  store_category_id?: string;
}

export default function Categories() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    status: 'YES',
    home_category: 'NO',
    store_category_id: '0',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // Fetch categories
  useEffect(() => {
    loadCategories();
  }, []);

  // Filter categories
  useEffect(() => {
    let filtered = categories;

    if (searchQuery) {
      filtered = filtered.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((cat) => cat.status === statusFilter);
    }

    setFilteredCategories(filtered);
  }, [categories, searchQuery, statusFilter]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await SectionAPI.getAll();

      if (response.status && response.result) {
        const transformedCategories = response.result.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.langDescrption || item.languageName || '',
          createdAt: item.createdAt || new Date().toISOString().split('T')[0],
          updatedAt: item.updatedAt || new Date().toISOString().split('T')[0],
          status: (item.status || 'YES') as 'YES' | 'NO',
          image_path: item.image_path || '',
          subCategories: item.categories || [],
          home_category: (item.home_category || 'NO') as 'YES' | 'NO',
          store_category_id: item.store_category_id || '0',
        }));

        setCategories(transformedCategories);
        setFilteredCategories(transformedCategories);
      }
    } catch (error: any) {
      console.error('Error loading categories:', error);
      showSnackbar('Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (category: Category | null = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        id: category.id,
        name: category.name,
        description: category.description,
        status: category.status,
        home_category: category.home_category,
        store_category_id: category.store_category_id,
      });
      setImagePreview(category.image_path);
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        status: 'YES',
        home_category: 'NO',
        store_category_id: '0',
      });
      setImagePreview('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      status: 'YES',
      home_category: 'NO',
      store_category_id: '0',
    });
    setImagePreview('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.checked ? 'YES' : 'NO',
    }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      showSnackbar('Failed to upload image', 'error');
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      showSnackbar('Category name is required', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const response = await SectionAPI.save(formData);

      if (response.status) {
        if (editingCategory) {
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === editingCategory.id
                ? {
                    ...cat,
                    ...formData,
                    image_path: imagePreview || cat.image_path,
                    updatedAt: new Date().toISOString().split('T')[0],
                  }
                : cat
            )
          );
          showSnackbar('Category updated successfully', 'success');
        } else {
          const newCategory: Category = {
            id: response.result?.id || `cat-${Date.now()}`,
            name: formData.name,
            description: formData.description || '',
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            status: formData.status || 'YES',
            image_path: imagePreview || '',
            subCategories: [],
            home_category: formData.home_category || 'NO',
            store_category_id: formData.store_category_id || '0',
          };
          setCategories((prev) => [newCategory, ...prev]);
          showSnackbar('Category created successfully', 'success');
        }
        handleCloseDialog();
      } else {
        throw new Error(response.message || 'Operation failed');
      }
    } catch (error: any) {
      console.error('Error saving category:', error);
      showSnackbar(error.message || 'Failed to save category', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await SectionAPI.delete(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      showSnackbar('Category deleted successfully', 'success');
    } catch (error: any) {
      console.error('Error deleting category:', error);
      showSnackbar(error.message || 'Failed to delete category', 'error');
    }
  };

  const toggleStatus = async (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (!category) return;

    try {
      await SectionAPI.toggleStatus(id, category.status);
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                status: category.status === 'YES' ? 'NO' : 'YES',
              }
            : cat
        )
      );
      showSnackbar(`Status updated successfully`, 'success');
    } catch (error: any) {
      console.error('Error toggling status:', error);
      showSnackbar(error.message || 'Failed to update status', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Loading categories...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top App Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CategoryIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" noWrap>
                Categories Management
              </Typography>
              <Chip
                label={`${filteredCategories.length} items`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              size="medium"
              sx={{ ml: 2 }}
            >
              {isMobile ? 'Add' : 'Add Category'}
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: { xs: 2, sm: 3 },
          }}
        >
          {/* Search and Filter Bar - FIXED GRID SYNTAX */}
          <Card
            elevation={0}
            sx={{ mb: 3, backgroundColor: 'background.paper' }}
          >
            <CardContent>
              {/* ✅ FIXED: Use Grid2 component or fix Grid syntax */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
                <Box sx={{ flex: 1, width: '100%' }}>
                  <TextField
                    fullWidth
                    placeholder="Search categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
                  <Button
                    startIcon={<FilterIcon />}
                    onClick={() =>
                      setStatusFilter(
                        statusFilter === 'ALL'
                          ? 'YES'
                          : statusFilter === 'YES'
                          ? 'NO'
                          : 'ALL'
                      )
                    }
                    variant={statusFilter !== 'ALL' ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                  >
                    Status: {statusFilter}
                  </Button>
                  <Button
                    startIcon={<RefreshIcon />}
                    onClick={loadCategories}
                    variant="outlined"
                    size="small"
                  >
                    Refresh
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Categories Table */}
          <Card
            elevation={0}
            sx={{ backgroundColor: 'background.paper', overflow: 'hidden' }}
          >
            <CardContent sx={{ p: 0 }}>
              <TableContainer
                sx={{
                  maxHeight: 'calc(100vh - 280px)',
                  overflow: 'auto',
                }}
              >
                <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
                  <TableHead>
                    <TableRow>
                      {!isMobile && (
                        <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                      )}
                      <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                      {!isTablet && (
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Description
                        </TableCell>
                      )}
                      {!isMobile && (
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Sub-Categories
                        </TableCell>
                      )}
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      {!isTablet && (
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Home Category
                        </TableCell>
                      )}
                      <TableCell
                        align="center"
                        sx={{ fontWeight: 'bold' }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCategories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                          <CategoryIcon
                            sx={{
                              fontSize: 64,
                              color: 'text.disabled',
                              mb: 2,
                            }}
                          />
                          <Typography variant="h6" color="text.secondary">
                            No categories found
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                          >
                            {searchQuery
                              ? 'Try a different search term'
                              : 'Click "Add Category" to create your first category'}
                          </Typography>
                          {searchQuery && (
                            <Button
                              variant="outlined"
                              onClick={() => setSearchQuery('')}
                            >
                              Clear Search
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCategories.map((category) => (
                        <TableRow key={category.id} hover>
                          {!isMobile && (
                            <TableCell>
                              <Avatar
                                src={category.image_path}
                                alt={category.name}
                                sx={{ width: 48, height: 48 }}
                              >
                                <CategoryIcon />
                              </Avatar>
                            </TableCell>
                          )}
                          <TableCell>
                            <Typography fontWeight="medium">
                              {category.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {category.id}
                            </Typography>
                          </TableCell>
                          {!isTablet && (
                            <TableCell>
                              <Typography variant="body2" noWrap>
                                {category.description || 'No description'}
                              </Typography>
                            </TableCell>
                          )}
                          {!isMobile && (
                            <TableCell>
                              <Chip
                                label={`${category.subCategories.length} items`}
                                size="small"
                                color={
                                  category.subCategories.length > 0
                                    ? 'info'
                                    : 'default'
                                }
                              />
                            </TableCell>
                          )}
                          <TableCell>
                            <Chip
                              icon={
                                category.status === 'YES' ? (
                                  <CheckCircle />
                                ) : (
                                  <Cancel />
                                )
                              }
                              label={category.status}
                              color={category.status === 'YES' ? 'success' : 'error'}
                              onClick={() => toggleStatus(category.id)}
                              clickable
                              size={isMobile ? 'small' : 'medium'}
                            />
                          </TableCell>
                          {!isTablet && (
                            <TableCell>
                              <Chip
                                icon={<HomeIcon />}
                                label={category.home_category}
                                color={
                                  category.home_category === 'YES'
                                    ? 'primary'
                                    : 'default'
                                }
                                size="small"
                              />
                            </TableCell>
                          )}
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1,
                              }}
                            >
                              <Tooltip title="Edit">
                                <IconButton
                                  color="primary"
                                  size="small"
                                  onClick={() => handleOpenDialog(category)}
                                >
                                  <EditIcon
                                    fontSize={isMobile ? 'small' : 'medium'}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  color="error"
                                  size="small"
                                  onClick={() => handleDelete(category.id)}
                                >
                                  <DeleteIcon
                                    fontSize={isMobile ? 'small' : 'medium'}
                                  />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Create/Edit Dialog - USING BOX INSTEAD OF GRID TO AVOID ERRORS */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CategoryIcon color="primary" />
            <Typography variant="h6">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {/* ✅ FIXED: Using Box instead of Grid to avoid MUI version issues */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {/* Image Upload */}
              <Box sx={{ flex: 1, maxWidth: { md: '33%' }, textAlign: 'center' }}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <Avatar
                  src={imagePreview}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    cursor: 'pointer',
                    border: '2px dashed',
                    borderColor: 'divider',
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadingImage ? (
                    <CircularProgress />
                  ) : (
                    <UploadIcon fontSize="large" />
                  )}
                </Avatar>
                <Button
                  variant="outlined"
                  startIcon={<UploadIcon />}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  fullWidth
                >
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                </Button>
              </Box>

              {/* Form Fields */}
              <Box sx={{ flex: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Category Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={submitting}
                      size="small"
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                      disabled={submitting}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <FormGroup sx={{ flex: 1 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.status === 'YES'}
                            onChange={handleSwitchChange('status')}
                            disabled={submitting}
                          />
                        }
                        label="Active Status"
                      />
                    </FormGroup>
                    <FormGroup sx={{ flex: 1 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.home_category === 'YES'}
                            onChange={handleSwitchChange('home_category')}
                            disabled={submitting}
                          />
                        }
                        label="Show on Homepage"
                      />
                    </FormGroup>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={submitting || !formData.name.trim()}
          >
            {submitting ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}