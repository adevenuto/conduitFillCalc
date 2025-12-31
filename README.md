# NEC Conduit Fill Calculator ⚡📏

A professional, free web-based tool for calculating electrical conduit fill percentages according to National Electrical Code (NEC) specifications.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

This electrical conduit fill calculator helps electricians, electrical engineers, and contractors determine proper conduit sizing based on NEC Chapter 9 specifications. The tool provides instant, accurate calculations for all common conduit types and wire configurations.

**Live Demo:** [Your Domain Here]

## ✨ Key Features

- **NEC Compliant Calculations** - Based on NEC Chapter 9, Tables 1, 4 & 5
- **Comprehensive Conduit Support** - EMT, PVC, Rigid, IMC, Flexible, and more
- **Multiple Wire Types** - THHN, THWN, XHHW, and custom wire areas
- **Two Calculation Modes:**
  - Find Minimum Conduit Size
  - Check If Wires Fit in Selected Conduit
- **Visual Fill Indicators** - Color-coded percentage displays
- **Preset Configurations** - Common wire bundles for quick calculations
- **Custom Wire Support** - Enter custom wire areas for specialty conductors
- **Mobile Responsive** - Works seamlessly on all devices
- **Real-time Validation** - Instant code compliance checking

## 🔧 Supported Conduit Types

### Metal Conduits
- **EMT** (Electrical Metallic Tubing)
- **RMC** (Rigid Metal Conduit)
- **IMC** (Intermediate Metal Conduit)
- **FMC** (Flexible Metal Conduit)

### Nonmetallic Conduits
- **PVC Schedule 40 & 80**
- **ENT** (Electrical Nonmetallic Tubing)
- **PVC-A** (PVC Type A)
- **PVC-EB** (PVC Type EB)

### Flexible Conduits
- **LFMC** (Liquidtight Flexible Metal Conduit)
- **LFNC** (Liquidtight Flexible Nonmetallic Conduit)

## 📚 Technical Details

### NEC Fill Percentages (Table 1)
- **1 conductor:** 53% maximum fill
- **2 conductors:** 31% maximum fill
- **3+ conductors:** 40% maximum fill

### Calculation Methodology

The calculator uses NEC Chapter 9 tables:
1. **Table 1** - Percentage fill based on conductor count
2. **Table 4** - Conduit and tubing dimensions
3. **Table 5** - Wire cross-sectional areas

**Formula:**
```
Total Wire Area = Σ(Wire Area × Quantity)
Allowable Fill = Conduit Internal Area × Fill Percentage
Compliance = Total Wire Area ≤ Allowable Fill
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/conduitFillCalc.git

# Navigate to project directory
cd conduitFillCalc

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 💻 Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **JavaScript/ES6+** - Programming language

## 📖 How to Use

1. **Select Calculation Mode**
   - "Find Min Size" - Determines smallest suitable conduit
   - "Check Fit" - Verifies if wires fit in selected conduit

2. **Choose Conduit Type**
   - Select from metal, nonmetallic, or flexible options

3. **Add Wires**
   - Use presets for common configurations
   - Add individual wires manually
   - Specify wire type, size, quantity, and role

4. **View Results**
   - See instant compliance status
   - Review detailed wire breakdown
   - Check fill percentages and visualizations

## 🎓 Use Cases

### For Electricians
- Plan wire pulls for new installations
- Verify existing installations for code compliance
- Estimate materials for project bids

### For Engineers
- Design electrical distribution systems
- Create accurate electrical plans
- Ensure code-compliant designs

### For Contractors
- Material estimation and ordering
- Project planning and scheduling
- Quality assurance checks

### For Students
- Learn NEC conduit fill requirements
- Practice electrical calculations
- Study code compliance

## 🔍 SEO Keywords

electrical conduit fill calculator, NEC conduit fill, wire fill percentage, conduit sizing calculator, electrical conduit calculator, NEC specifications, wire sizing tool, EMT conduit fill, PVC conduit calculator, electrical installation, conduit fill chart, NEC Chapter 9, electrical wiring calculator, conductor fill calculation

## ⚠️ Important Disclaimer

This calculator is provided as a reference tool only. Always:
- Verify calculations with current NEC code books
- Consult with a licensed electrician
- Comply with local electrical codes and regulations
- Follow manufacturer specifications

The creators assume no liability for installations based on these calculations.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Project Link: [https://github.com/yourusername/conduitFillCalc](https://github.com/yourusername/conduitFillCalc)

## 🙏 Acknowledgments

- National Fire Protection Association (NFPA) for NEC standards
- Electrical engineering community for feedback and suggestions
- All contributors who help improve this tool

## 📊 Project Structure

```
conduitFillCalc/
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Icons.js
│   │   ├── Modal.js
│   │   └── PresetsModal.js
│   ├── utils/
│   │   └── nec/
│   │       ├── conduitTypes.js
│   │       ├── fillRules.js
│   │       ├── wireCategories.js
│   │       ├── wirePresets.js
│   │       ├── wireTypes.js
│   │       └── index.js
│   ├── App.js
│   ├── index.css
│   └── main.js
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔮 Future Enhancements

- [ ] Export calculations to PDF
- [ ] Save/load project configurations
- [ ] Multi-conduit calculations
- [ ] Metric unit support
- [ ] Dark mode
- [ ] Print-friendly results
- [ ] Additional wire types
- [ ] Historical calculation library

---

**Made with ⚡ for the electrical community**
