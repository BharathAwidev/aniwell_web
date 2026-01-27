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
