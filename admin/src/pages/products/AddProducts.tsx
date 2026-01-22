// AddProduct.tsx - UPDATED VERSION WITH 3 STEPS
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Chip,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Save as SaveIcon, 
  Home as HomeIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Interior Design Categories
const categories = [
  { id: 'cat-1', name: 'Design Ideas', icon: '💡' },
  { id: 'cat-2', name: 'Magazine', icon: '📰' },
  { id: 'cat-3', name: 'Cities', icon: '🏙️' },
  { id: 'cat-4', name: 'Projects', icon: '🏠' },
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

const steps = ['Service Details', 'Specifications & Status', 'Review'];

export default function AddProduct() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [filteredSubcategories, setFilteredSubcategories] = useState(subcategories);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    categoryId: '',
    subcategoryId: '',
    isActive: true,
    dimensions: '',
    material: '',
    style: '',
  });

  useEffect(() => {
    if (formData.categoryId) {
      const filtered = subcategories.filter(
        sub => sub.categoryId === formData.categoryId
      );
      setFilteredSubcategories(filtered);
    }
  }, [formData.categoryId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Project data:', formData);
    alert('Interior project added successfully!');
    // Reset form
    setFormData({
      name: '',
      description: '',
      sku: '',
      categoryId: '',
      subcategoryId: '',
      isActive: true,
      dimensions: '',
      material: '',
      style: '',
    });
    setActiveStep(0);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: // Service Details
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2.5,
            p: { xs: 1, sm: 0 }
          }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                fullWidth
                label="Service Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1, minWidth: { xs: '100%', sm: 300 } }}
                InputProps={{
                  startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <TextField
                fullWidth
                label="SKU Code (Optional)"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1, minWidth: { xs: '100%', sm: 300 } }}
                helperText="Will be auto-generated if left empty"
                placeholder="e.g., KITCHEN-MOD-001"
              />
            </Box>
            
            <TextField
              fullWidth
              label="Service Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={isMobile ? 3 : 4}
              size={isMobile ? "small" : "medium"}
              placeholder="Describe the interior design project..."
            />
          </Box>
        );
      
      case 1: // Specifications & Status
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            p: { xs: 1, sm: 0 }
          }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControl 
                fullWidth 
                required 
                size={isMobile ? "small" : "medium"}
                sx={{ flex: 1, minWidth: { xs: '100%', sm: 250 } }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleSelectChange}
                  label="Category"
                >
                  <MenuItem value="">Select a category</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                        <Typography variant="body2">{category.name}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl 
                fullWidth 
                required 
                size={isMobile ? "small" : "medium"}
                disabled={!formData.categoryId}
                sx={{ flex: 1, minWidth: { xs: '100%', sm: 250 } }}
              >
                <InputLabel>Subcategory</InputLabel>
                <Select
                  name="subcategoryId"
                  value={formData.subcategoryId}
                  onChange={handleSelectChange}
                  label="Subcategory"
                >
                  <MenuItem value="">Select a subcategory</MenuItem>
                  {filteredSubcategories.map(subcategory => (
                    <MenuItem key={subcategory.id} value={subcategory.id}>
                      <Typography variant="body2">{subcategory.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
              Service Specifications
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap',
              '& > *': { 
                flex: 1, 
                minWidth: { xs: '100%', sm: 'calc(33.333% - 16px)', md: 200 } 
              }
            }}>
              <TextField
                label="Dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
                placeholder="e.g., 10ft x 12ft"
                fullWidth
              />
              <TextField
                label="Material"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
                placeholder="e.g., Wood & Glass"
                fullWidth
              />
              <TextField
                label="Style"
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                size={isMobile ? "small" : "medium"}
                placeholder="e.g., Modern, Contemporary"
                fullWidth
              />
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              p: 2,
              bgcolor: 'grey.50',
              borderRadius: 1
            }}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Service Status
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Set the project as active or inactive
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={handleSwitchChange}
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={formData.isActive ? 'Active' : 'Inactive'} 
                      color={formData.isActive ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                }
              />
            </Box>
          </Box>
        );
      
      case 2: // Review
        const selectedCategory = categories.find(c => c.id === formData.categoryId);
        const selectedSubcategory = subcategories.find(s => s.id === formData.subcategoryId);
        
        return (
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 3 },
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              mb: 3 
            }}>
              <CheckCircleIcon color="primary" />
              Review Service Details
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Project Information Section */}
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: 2
                }}>
                  <DescriptionIcon fontSize="small" />
                  Service Information
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  '& > *': { 
                    flex: 1, 
                    minWidth: { xs: '100%', sm: 250 } 
                  }
                }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Service Name
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formData.name || 'Not provided'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      SKU Code
                    </Typography>
                    <Typography variant="body1">
                      {formData.sku ? (
                        <Chip 
                          label={formData.sku} 
                          size="small" 
                          variant="outlined" 
                          sx={{ fontWeight: 500 }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Will be auto-generated
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    p: 1.5, 
                    bgcolor: 'grey.50', 
                    borderRadius: 1,
                    minHeight: '60px'
                  }}>
                    {formData.description || 'No description provided'}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Category & Specifications Section */}
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  mb: 2
                }}>
                  <CategoryIcon fontSize="small" />
                  Category & Specifications
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  '& > *': { 
                    flex: 1, 
                    minWidth: { xs: '100%', sm: 250 } 
                  }
                }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Category
                    </Typography>
                    {selectedCategory ? (
                      <Chip 
                        label={selectedCategory.name} 
                        icon={<span>{selectedCategory.icon}</span>}
                        sx={{ mt: 0.5 }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Not selected
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Subcategory
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {selectedSubcategory?.name || 'Not selected'}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap', 
                  mt: 2,
                  '& > *': { 
                    flex: 1, 
                    minWidth: { xs: '100%', sm: 'calc(33.333% - 16px)', md: 150 } 
                  }
                }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Dimensions
                    </Typography>
                    <Typography variant="body1">{formData.dimensions || 'Not specified'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Material
                    </Typography>
                    <Typography variant="body1">{formData.material || 'Not specified'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Style
                    </Typography>
                    <Typography variant="body1">{formData.style || 'Not specified'}</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider />

              {/* Project Status Section */}
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ mb: 2 }}>
                  Service Status
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: formData.isActive ? 'success.light' : 'error.light',
                  borderRadius: 1
                }}>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      Service Status
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formData.isActive 
                        ? 'This project will be visible to users' 
                        : 'This project will be hidden from users'
                      }
                    </Typography>
                  </Box>
                  <Chip 
                    label={formData.isActive ? 'Active' : 'Inactive'} 
                    color={formData.isActive ? 'success' : 'error'}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </Box>

            </Box>
          </Paper>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      width: '100%',
      maxWidth: 1200,
      mx: 'auto',
      boxSizing: 'border-box'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <Button
          component={Link}
          to="/products"
          startIcon={<ArrowBackIcon />}
          size={isMobile ? "small" : "medium"}
          sx={{ 
            alignSelf: 'flex-start',
            mb: 1
          }}
        >
          Back to Projects
        </Button>
        
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <HomeIcon sx={{ 
            fontSize: { xs: 28, sm: 32, md: 36 }, 
            color: 'primary.main' 
          }} />
          <Typography variant="h4" sx={{ 
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            lineHeight: 1.2
          }}>
            Add New Interior Services
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Complete the steps below to add a new interior design Service
        </Typography>
      </Box>

      {/* Main Form Card */}
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Responsive Stepper */}
          <Box sx={{ 
            mb: 4, 
            overflowX: 'auto',
            '& .MuiStepper-root': {
              flexWrap: 'wrap'
            },
            '& .MuiStepLabel-root': {
              flexDirection: { xs: 'column', sm: 'row' }
            }
          }}>
            <Stepper 
              activeStep={activeStep} 
              sx={{ 
                '& .MuiStepLabel-label': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  mt: { xs: 1, sm: 0 }
                }
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel 
                    StepIconProps={{
                      sx: {
                        width: { xs: 32, sm: 36 },
                        height: { xs: 32, sm: 36 }
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Step Content */}
          <Box sx={{ 
            mt: 3,
            minHeight: { xs: 300, sm: 350 }
          }}>
            {renderStepContent(activeStep)}
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 4, 
            flexWrap: 'wrap',
            gap: 2,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              size={isMobile ? "medium" : "medium"}
              sx={{ 
                width: { xs: '100%', sm: 'auto' },
                order: { xs: 2, sm: 1 }
              }}
            >
              Back
            </Button>
            
            <Box sx={{ 
              width: { xs: '100%', sm: 'auto' },
              order: { xs: 1, sm: 2 }
            }}>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={<SaveIcon />}
                  size={isMobile ? "medium" : "medium"}
                  fullWidth={isMobile}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 180 },
                    py: { xs: 1, sm: 1.25 }
                  }}
                >
                  Save Project
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  size={isMobile ? "medium" : "medium"}
                  fullWidth={isMobile}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 120 },
                    py: { xs: 1, sm: 1.25 }
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
