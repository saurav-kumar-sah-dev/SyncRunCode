# Compiler Setup Guide

This guide helps you install the required compilers for SyncRunCode to work properly.

## 🚀 Required Compilers

SyncRunCode supports the following languages and requires their respective compilers:

| Language | Compiler | Download Link |
|----------|----------|---------------|
| **JavaScript** | Node.js | [Download Node.js](https://nodejs.org/) |
| **Python** | Python 3.x | [Download Python](https://www.python.org/downloads/) |
| **Java** | JDK (Java Development Kit) | [Download JDK](https://www.oracle.com/java/technologies/downloads/) |
| **C++** | GCC (MinGW-w64) | [Download MinGW-w64](https://www.mingw-w64.org/downloads/) |
| **C** | GCC (MinGW-w64) | Same as C++ |
| **TypeScript** | Node.js + TypeScript | `npm install -g typescript` |

## 🪟 Windows Setup

### 1. Node.js (for JavaScript & TypeScript)
```bash
# Download and install from https://nodejs.org/
# Verify installation:
node --version
npm --version
```

### 2. Python
```bash
# Download and install from https://www.python.org/downloads/
# Make sure to check "Add Python to PATH" during installation
# Verify installation:
python --version
# or
python3 --version
```

### 3. Java (JDK)
```bash
# Download JDK from https://www.oracle.com/java/technologies/downloads/
# Or use OpenJDK: https://adoptium.net/
# Verify installation:
java --version
javac --version
```

### 4. C/C++ Compiler (MinGW-w64)
**Option A: MSYS2 (Recommended)**
```bash
# Download from https://www.msys2.org/
# After installation, open MSYS2 terminal and run:
pacman -S mingw-w64-x86_64-gcc
pacman -S mingw-w64-x86_64-gdb

# Add to PATH: C:\msys64\mingw64\bin
# Verify installation:
gcc --version
g++ --version
```

**Option B: MinGW-w64 Standalone**
```bash
# Download from https://www.mingw-w64.org/downloads/
# Extract and add to PATH
# Verify installation:
gcc --version
g++ --version
```

## 🐧 Linux Setup

### Ubuntu/Debian
```bash
# Update package list
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python
sudo apt install python3 python3-pip

# Install Java
sudo apt install openjdk-11-jdk

# Install GCC
sudo apt install gcc g++

# Install TypeScript
sudo npm install -g typescript

# Verify installations
node --version
python3 --version
java --version
gcc --version
```

### CentOS/RHEL/Fedora
```bash
# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install nodejs

# Install Python
sudo dnf install python3 python3-pip

# Install Java
sudo dnf install java-11-openjdk-devel

# Install GCC
sudo dnf install gcc gcc-c++

# Install TypeScript
sudo npm install -g typescript
```

## 🍎 macOS Setup

### Using Homebrew (Recommended)
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Python
brew install python

# Install Java
brew install openjdk@11

# Install GCC
brew install gcc

# Install TypeScript
npm install -g typescript

# Verify installations
node --version
python3 --version
java --version
gcc --version
```

## 🔧 Verification

After installing all compilers, verify they work by running these commands:

```bash
# JavaScript/Node.js
node --version

# Python
python --version
# or
python3 --version

# Java
java --version
javac --version

# C/C++
gcc --version
g++ --version

# TypeScript
tsc --version
```

## 🚨 Troubleshooting

### Common Issues

1. **"Command not found" errors**
   - Make sure the compiler is added to your system PATH
   - Restart your terminal/command prompt after installation

2. **Permission denied errors**
   - On Linux/macOS, you might need to use `sudo` for global installations
   - Check file permissions

3. **Version conflicts**
   - Make sure you're using compatible versions
   - Node.js 18+ is recommended
   - Python 3.8+ is recommended
   - Java 11+ is recommended

4. **Windows PATH issues**
   - Add compiler directories to Windows PATH environment variable
   - Common paths:
     - Node.js: `C:\Program Files\nodejs\`
     - Python: `C:\Python39\` or `C:\Users\YourName\AppData\Local\Programs\Python\Python39\`
     - MinGW: `C:\msys64\mingw64\bin\`

### Testing Compilers

You can test if the compilers work by creating simple test files:

**JavaScript Test:**
```javascript
// test.js
console.log("Hello from Node.js!");
```
```bash
node test.js
```

**Python Test:**
```python
# test.py
print("Hello from Python!")
```
```bash
python test.py
```

**Java Test:**
```java
// Test.java
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}
```
```bash
javac Test.java
java Test
```

**C++ Test:**
```cpp
// test.cpp
#include <iostream>
int main() {
    std::cout << "Hello from C++!" << std::endl;
    return 0;
}
```
```bash
g++ test.cpp -o test
./test
```

## 📝 Notes

- **Windows users**: Consider using Windows Subsystem for Linux (WSL) for a better development experience
- **Docker users**: You can also run the compilers in Docker containers
- **Cloud development**: For cloud deployment, make sure your hosting platform supports these compilers

## 🆘 Need Help?

If you encounter issues:
1. Check the compiler documentation
2. Verify PATH environment variables
3. Test with simple programs first
4. Check system requirements
5. Look for platform-specific installation guides

---

**Happy Coding! 🎉**
