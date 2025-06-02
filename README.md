# FoodScan AI - Advanced Food Spoilage Detection

![FoodScan AI](static/images/og-image.jpg)

FoodScan AI is an advanced machine learning system that uses computer vision and sensor data to detect food spoilage, helping reduce food waste and prevent foodborne illness.

## 🌟 Features

- **AI-Powered Image Analysis**: Upload food images for instant freshness detection
- **Multi-Modal Detection**: Combines visual analysis with sensor data
- **High Accuracy**: Achieves over 95% accuracy using VGG16 deep learning model
- **Real-time Analysis**: Get results in seconds
- **Mobile Friendly**: Works on all devices with responsive design
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Analysis History**: Track and review previous analyses
- **Educational Content**: Learn about food safety and spoilage indicators

## 🔧 Technical Stack

### Frontend
- **HTML5/CSS3**: Modern responsive design
- **JavaScript (Vanilla)**: Interactive UI components
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography (Poppins, Montserrat)

### Backend
- **Python 3.7+**: Core application logic
- **Flask**: Web framework
- **TensorFlow/Keras**: Deep learning model
- **OpenCV**: Image processing
- **PIL (Pillow)**: Image manipulation
- **NumPy**: Numerical computations
- **Pandas**: Data analysis
- **Scikit-learn**: Classical ML algorithms

### Machine Learning
- **VGG16**: Pre-trained CNN for image classification
- **Transfer Learning**: Fine-tuned on fruit dataset
- **Data Augmentation**: Enhanced training with image transformations
- **Multi-Algorithm Comparison**: Random Forest, XGBoost, SVM, Neural Networks

## 📁 Project Structure

```
FoodSpoilagePredictor-MLDL/
├── app.py                          # Flask web application
├── Model_train_using_Images.ipynb  # Image model training notebook
├── Model_train_using_sensor_data.py # Sensor data model training
├── templates/
│   ├── index.html                  # Main web interface
│   └── 404.html                    # Error page
├── static/
│   ├── style.css                   # Styling
│   ├── script.js                   # Frontend JavaScript
│   └── images/                     # Static images
├── model/
│   └── model.h5                    # Trained TensorFlow model
├── uploads/                        # User uploaded images
├── data/                           # Application data
├── gan_output/                     # Generated sensor datasets
└── sensor_output/                  # Model training results
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip package manager
- Git (optional)

### 1. Clone Repository
```bash
git clone <repository-url>
cd "FoodSpoilagePredictor-MLDL"
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist, install manually:
```bash
pip install flask tensorflow opencv-python pillow numpy pandas scikit-learn matplotlib seaborn xgboost
```

### 4. Download Pre-trained Model
- Ensure `model/model.h5` exists in the project directory
- If training from scratch, run the Jupyter notebook `Model_train_using_Images.ipynb`

### 5. Create Required Directories
```bash
mkdir uploads data static/images model
```

## 🎯 Usage

### Starting the Application
```bash
python app.py
```

The application will be available at `http://localhost:5000`

### Using the Web Interface

1. **Upload Image**: Drag and drop or select a food image
2. **Preview**: Review and optionally crop the image
3. **Analyze**: Click "Analyze Food" for AI detection
4. **Results**: View freshness status, confidence level, and recommendations
5. **History**: Access previous analyses from the menu

### API Endpoints

#### Analyze Image
```http
POST /analyze
Content-Type: multipart/form-data

file: [image file]
```

#### Get Analysis History
```http
GET /history
```

#### Clear History
```http
POST /clear-history
```

## 🧠 Model Training

### Image Classification Model

The image model uses transfer learning with VGG16:

1. **Dataset**: Fruits Fresh and Rotten for Classification (Kaggle)
2. **Preprocessing**: Resize to 150x150, normalization
3. **Augmentation**: Rotation, flipping, zoom, shift
4. **Architecture**: VGG16 + Custom dense layers
5. **Training**: Binary classification (Fresh/Rotten)

### Sensor Data Model

Multiple algorithms are compared for sensor-based detection:

1. **Random Forest**: Ensemble method for robust predictions
2. **XGBoost**: Gradient boosting for high performance
3. **SVM**: Support vector machines for complex boundaries
4. **Neural Networks**: Deep learning for pattern recognition

### Running Training

#### Image Model
```bash
jupyter notebook Model_train_using_Images.ipynb
```

#### Sensor Model
```bash
python Model_train_using_sensor_data.py
```

## 📊 Performance Metrics

### Image Classification
- **Accuracy**: ~95%
- **Model**: VGG16 Transfer Learning
- **Dataset**: 13,000+ fruit images
- **Classes**: Fresh Fruit, Rotten Fruit

### Sensor Classification
- **Features**: Temperature, Humidity, Gas, VOC, CO, pH, Light
- **Best Algorithm**: (Varies by dataset)
- **Cross-validation**: 5-fold validation
- **Metrics**: Accuracy, Precision, Recall, F1-score

## 🔍 Supported Food Types

### Fruits
- Apples (fresh/rotten detection)
- Bananas (ripeness and spoilage)
- Oranges (freshness assessment)

### Future Support
- Vegetables
- Dairy products
- Bread and baked goods
- Prepared foods

## 🛠️ Configuration

### Environment Variables
```bash
FLASK_APP=app.py
FLASK_ENV=development  # or production
MODEL_PATH=model/model.h5
UPLOAD_FOLDER=uploads
```

### Application Settings
- **Max Upload Size**: 16MB
- **Allowed Formats**: JPG, PNG, JPEG, GIF
- **Image Size**: 150x150 pixels (automatically resized)
- **History Limit**: 50 recent analyses

## 🚨 Troubleshooting

### Common Issues

#### Model Loading Error
```
Error loading model: No such file or directory: 'model/model.h5'
```
**Solution**: Ensure the trained model file exists or train a new model.

#### Memory Error During Training
```
ResourceExhaustedError: OOM when allocating tensor
```
**Solution**: Reduce batch size or use a smaller model architecture.

#### File Upload Issues
```
File type not allowed
```
**Solution**: Use supported image formats (JPG, PNG, JPEG, GIF).

### Performance Optimization
- Use GPU for model training (CUDA-enabled TensorFlow)
- Implement image caching for faster repeated analyses
- Consider model quantization for mobile deployment

## 📈 Future Enhancements

### Planned Features
- [ ] Multi-language support
- [ ] Mobile app (React Native/Flutter)
- [ ] Real-time camera analysis
- [ ] Batch image processing
- [ ] Advanced nutritional information
- [ ] Integration with IoT sensors
- [ ] Cloud deployment (AWS/Azure)

### Technical Improvements
- [ ] Model ensemble for higher accuracy
- [ ] Explainable AI features
- [ ] Edge deployment optimization
- [ ] Advanced data augmentation
- [ ] Automated model retraining

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 Python style guide
- Add unit tests for new features
- Update documentation for API changes
- Test on multiple devices/browsers


## 🙏 Acknowledgments

- **Kaggle**: Fruits Fresh and Rotten dataset
- **TensorFlow Team**: Pre-trained VGG16 model
- **Flask Community**: Web framework
- **Open Source Contributors**: Various libraries and tools

## 📞 Support

- **Email**: [ishanshivankar14@gmail.com]
- **Issues**: [GitHub Issues](repository-url/issues)
- **Documentation**: [Project Wiki](repository-url/wiki)

## 🔗 Related Resources

- [Food Safety Guidelines](https://www.fda.gov/food/buy-store-serve-safe-food)
- [Machine Learning for Food Science](https://example.com)
- [Computer Vision in Agriculture](https://example.com)

---

**Made with ❤️ for food safety and waste reduction**

*Last updated: May 2025*
