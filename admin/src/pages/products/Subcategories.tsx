// Subcategories.tsx - UPDATED WITH sectionId (NOT section_id)
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
  Paper,
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
  Tooltip,
  Avatar,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
  DesignServices as DesignIcon,
} from '@mui/icons-material';
import { SectionAPI, type SubcategoryData } from '../../api/section.api';

interface Category {
  id: string;
  name: string;
  status: string;
  description?: string;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
  image_path?: string;
  sectionId: string; // ✅ CHANGED from section_id to sectionId
  sectionName?: string;
}

export default function Subcategories() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (editingSubcategory) {
      setFormData({
        name: editingSubcategory.name,
        description: editingSubcategory.description || '',
        categoryId: editingSubcategory.sectionId || editingSubcategory.categoryId || '',
      });
    }
  }, [editingSubcategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const categoriesResponse = await SectionAPI.getAll();
      
      if (categoriesResponse.status && categoriesResponse.result) {
        const fetchedCategories = categoriesResponse.result.map((item: any) => ({
          id: item.id,
          name: item.name,
          status: item.status || 'YES',
          description: item.description || '',
        }));
        setCategories(fetchedCategories);
        
        if (fetchedCategories.length > 0 && !formData.categoryId) {
          setFormData(prev => ({ ...prev, categoryId: fetchedCategories[0].id }));
        }

        try {
          const subcategoriesResponse = await SectionAPI.getAllSubcategories();
          
          if (subcategoriesResponse.status && subcategoriesResponse.result) {
            const allSubcategories: Subcategory[] = [];
            
            subcategoriesResponse.result.forEach((sub: any) => {
              // ✅ Check both section_id and sectionId from backend
              const sectionIdValue = sub.sectionId || sub.section_id || '0';
              
              const parentCategory = fetchedCategories.find(
                (cat: any) => cat.id === sectionIdValue
              );
              
              const formatDate = (dateString: string) => {
                if (!dateString || dateString === '0000-00-00 00:00:00') {
                  return new Date().toISOString().split('T')[0];
                }
                return dateString.split(' ')[0];
              };
              
              allSubcategories.push({
                id: sub.id,
                name: sub.name,
                description: sub.description || '',
                categoryId: sectionIdValue,
                categoryName: parentCategory?.name || sub.sectionName || 'Uncategorized',
                createdAt: formatDate(sub.created_at || sub.createdAt),
                updatedAt: formatDate(sub.updated_at || sub.updatedAt),
                status: sub.status || 'YES',
                image_path: sub.image_path,
                sectionId: sectionIdValue, // ✅ Using sectionId
                sectionName: sub.sectionName
              });
            });
            
            setSubcategories(allSubcategories);
          }
        } catch (subError) {
          console.error('Error loading subcategories:', subError);
          showSnackbar('Failed to load subcategories', 'error');
        }
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      showSnackbar('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (subcategory: Subcategory | null = null) => {
    if (subcategory) {
      setEditingSubcategory(subcategory);
    } else {
      setEditingSubcategory(null);
      setFormData({
        name: '',
        description: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSubcategory(null);
    setFormData({
      name: '',
      description: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      categoryId: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      showSnackbar('Subcategory name is required', 'error');
      return;
    }

    if (!formData.categoryId) {
      showSnackbar('Please select a category', 'error');
      return;
    }

    try {
      setSubmitting(true);
      
      const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
      
      if (!selectedCategory) {
        showSnackbar('Selected category not found', 'error');
        return;
      }
      
      // ✅ UPDATED: Using sectionId (not section_id)
      const subcategoryData: SubcategoryData = {
        name: formData.name,
        description: formData.description,
        sectionId: formData.categoryId, // ✅ Changed from section_id to sectionId
        sectionName: selectedCategory.name,
        status: 'YES' as const,
      };
      
      if (editingSubcategory) {
        subcategoryData.id = editingSubcategory.id;
      }
      
      console.log('📤 Sending to backend:', subcategoryData);
      
      const response = await SectionAPI.saveSubcategory(subcategoryData);
      
      console.log('📥 Backend response:', response);
      
      if (response.status) {
        await loadData();
        
        showSnackbar(
          editingSubcategory 
            ? 'Subcategory updated successfully' 
            : 'Subcategory created successfully', 
          'success'
        );
        
        handleCloseDialog();
      } else {
        throw new Error(response.message || 'Operation failed');
      }
    } catch (error: any) {
      console.error('Error saving subcategory:', error);
      showSnackbar(
        error.response?.data?.message || 
        error.message || 
        'Failed to save subcategory', 
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) return;
    
    try {
      const response = await SectionAPI.deleteSubcategory(id);
      
      if (response.status) {
        setSubcategories(prev => prev.filter(sub => sub.id !== id));
        showSnackbar('Subcategory deleted successfully', 'success');
      } else {
        throw new Error(response.message || 'Delete failed');
      }
    } catch (error: any) {
      console.error('Error deleting subcategory:', error);
      showSnackbar(error.response?.data?.message || error.message || 'Failed to delete subcategory', 'error');
    }
  };

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'default'> = {
      'Design Ideas': 'primary',
      'Chicken Skin': 'primary',
      'Magazine': 'secondary',
      'Cities': 'info',
      'Projects': 'success',
      'Uncategorized': 'warning',
    };
    return colors[categoryName] || 'default';
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        width: '100%' 
      }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading subcategories...</Typography>
      </Box>
    );
  }

  // Mobile view - Card layout
  const renderMobileView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {subcategories.map(subcategory => (
        <Card key={subcategory.id} elevation={2}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{ 
                  bgcolor: `${getCategoryColor(subcategory.categoryName)}.light`, 
                  width: 32, 
                  height: 32 
                }}>
                  <CategoryIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {subcategory.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ID: {subcategory.id}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" gap={0.5}>
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(subcategory)}
                  disabled={submitting}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(subcategory.id)}
                  disabled={submitting}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {subcategory.description || 'No description'}
            </Typography>
            
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              <Chip
                label={`Cat ID: ${subcategory.sectionId}`}
                size="small"
                variant="outlined"
                color={subcategory.sectionId !== "0" ? 'primary' : 'warning'}
              />
              <Chip
                label={subcategory.categoryName}
                size="small"
                variant="outlined"
                color={getCategoryColor(subcategory.categoryName)}
              />
              <Typography variant="caption" color="text.secondary">
                Created: {subcategory.createdAt}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  // Desktop view - Table layout
  const renderDesktopView = () => (
    <Card elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
      <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
        <TableContainer 
          component={Paper} 
          elevation={0}
          sx={{ 
            width: '100%',
            overflowX: 'auto',
            maxHeight: isTablet ? 'calc(100vh - 200px)' : 'calc(100vh - 250px)',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
          }}
        >
          <Table sx={{ minWidth: isTablet ? 700 : 800 }}>
            <TableHead sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: isTablet ? '80px' : '100px' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: '150px' }}>Subcategory</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: isTablet ? '150px' : '200px' }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: isTablet ? '90px' : '120px' }}>Cat ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', minWidth: '120px' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: isTablet ? '80px' : '100px' }}>Created</TableCell>
                {!isTablet && (
                  <TableCell sx={{ fontWeight: 'bold', width: '100px' }}>Updated</TableCell>
                )}
                <TableCell align="center" sx={{ fontWeight: 'bold', width: '100px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subcategories.map(subcategory => (
                <TableRow 
                  key={subcategory.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Chip 
                      label={subcategory.id} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar sx={{ 
                        bgcolor: `${getCategoryColor(subcategory.categoryName)}.light`, 
                        width: 28, 
                        height: 28 
                      }}>
                        <CategoryIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                        {subcategory.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      wordBreak: 'break-word',
                      fontSize: '0.875rem'
                    }}>
                      {subcategory.description || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={subcategory.sectionId}
                      size="small"
                      variant="outlined"
                      color={subcategory.sectionId !== "0" ? 'primary' : 'warning'}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={subcategory.categoryName}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {subcategory.createdAt}
                    </Typography>
                  </TableCell>
                  {!isTablet && (
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {subcategory.updatedAt}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell align="center">
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(subcategory)}
                          disabled={submitting}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(subcategory.id)}
                          disabled={submitting}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: { xs: 2, sm: 3 },
        flexWrap: 'wrap',
        gap: { xs: 1, sm: 2 },
        flexShrink: 0
      }}>
        <Box display="flex" alignItems="center" gap={1}>
          <DesignIcon sx={{ 
            fontSize: { xs: 24, sm: 28, md: 32 }, 
            color: 'secondary.main' 
          }} />
          <Typography variant="h6" sx={{ 
            fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.6rem' },
            wordBreak: 'break-word'
          }}>
            Subcategories ({subcategories.length})
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          size={isMobile ? "small" : "medium"}
          disabled={categories.length === 0}
          sx={{ 
            flexShrink: 0,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {isMobile ? 'Add' : 'Add Subcategory'}
        </Button>
      </Box>

      {/* Content Area - Scrollable */}
      <Box sx={{ 
        flex: 1,
        overflow: 'auto',
        width: '100%'
      }}>
        {categories.length === 0 ? (
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <DesignIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No categories found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Please create categories first before adding subcategories
              </Typography>
            </CardContent>
          </Card>
        ) : subcategories.length === 0 ? (
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <DesignIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No subcategories found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Click "Add Subcategory" to create your first subcategory
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                size="small"
              >
                Add Subcategory
              </Button>
            </CardContent>
          </Card>
        ) : isMobile ? (
          renderMobileView()
        ) : (
          renderDesktopView()
        )}
      </Box>

      {/* Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        fullScreen={isMobile}
        sx={{
          '& .MuiDialog-paper': {
            margin: { xs: 0, sm: 2 },
            width: '100%',
            maxHeight: isMobile ? '100vh' : '90vh'
          }
        }}
      >
        <DialogTitle sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant={isMobile ? "h6" : "h5"}>
            {editingSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.categoryId}
              onChange={handleSelectChange}
              label="Category"
              size={isMobile ? "small" : "medium"}
            >
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name} (ID: {category.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Subcategory Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            required
            size={isMobile ? "small" : "medium"}
            disabled={submitting}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={isMobile ? 2 : 3}
            size={isMobile ? "small" : "medium"}
            disabled={submitting}
          />
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button onClick={handleCloseDialog} color="inherit" disabled={submitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={submitting || !formData.name.trim()}
          >
            {submitting ? (
              <CircularProgress size={24} />
            ) : editingSubcategory ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}