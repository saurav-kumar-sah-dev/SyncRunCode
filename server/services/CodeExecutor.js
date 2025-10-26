const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const os = require('os');

class CodeExecutor {
  constructor() {
    this.tempDir = path.join(os.tmpdir(), 'syncruncode');
    this.timeout = parseInt(process.env.EXECUTION_TIMEOUT) || 5000;
    this.maxMemory = 128 * 1024 * 1024; // 128MB
  }

  async checkCompiler(compiler) {
    return new Promise((resolve) => {
      const checkProcess = spawn(compiler, ['--version'], {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      // Set a timeout for compiler check
      const timeout = setTimeout(() => {
        checkProcess.kill('SIGKILL');
        resolve(false);
      }, 3000); // 3 second timeout
      
      checkProcess.on('close', (code) => {
        clearTimeout(timeout);
        resolve(code === 0);
      });
      
      checkProcess.on('error', () => {
        clearTimeout(timeout);
        resolve(false);
      });
    });
  }

  async ensureTempDir() {
    try {
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (error) {
      console.error('Error creating temp directory:', error);
    }
  }

  async executeCode(language, code, input = '') {
    await this.ensureTempDir();
    
    const executionId = uuidv4();
    const tempDir = path.join(this.tempDir, executionId);
    
    try {
      await fs.mkdir(tempDir, { recursive: true });
      
      let result;
      switch (language.toLowerCase()) {
        case 'javascript':
        case 'js':
          result = await this.executeJavaScript(code, input, tempDir);
          break;
        case 'python':
        case 'py':
          result = await this.executePython(code, input, tempDir);
          break;
        case 'java':
          result = await this.executeJava(code, input, tempDir);
          break;
        case 'cpp':
        case 'c++':
          result = await this.executeCpp(code, input, tempDir);
          break;
        case 'c':
          result = await this.executeC(code, input, tempDir);
          break;
        case 'typescript':
        case 'ts':
          result = await this.executeTypeScript(code, input, tempDir);
          break;
        default:
          throw new Error(`Unsupported language: ${language}`);
      }

      return result;
    } catch (error) {
      console.error('Execution error:', error);
      return {
        success: false,
        output: '',
        error: error.message,
        executionTime: 0,
        memoryUsage: 0,
        status: 'error'
      };
    } finally {
      // Clean up temp directory
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
      } catch (error) {
        console.error('Error cleaning up temp directory:', error);
      }
    }
  }

  async executeJavaScript(code, input, tempDir) {
    const startTime = Date.now();
    const filePath = path.join(tempDir, 'main.js');
    
    await fs.writeFile(filePath, code);
    
    return new Promise((resolve) => {
      const child = spawn('node', [filePath], {
        cwd: tempDir,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let output = '';
      let error = '';
      let memoryUsage = 0;

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        error += data.toString();
      });

      child.on('close', (code) => {
        const executionTime = Date.now() - startTime;
        
        resolve({
          success: code === 0,
          output: output.trim(),
          error: error.trim(),
          executionTime,
          memoryUsage,
          status: code === 0 ? 'success' : 'runtime_error',
          exitCode: code
        });
      });

      child.on('error', (err) => {
        const executionTime = Date.now() - startTime;
        resolve({
          success: false,
          output: '',
          error: err.message,
          executionTime,
          memoryUsage: 0,
          status: 'error'
        });
      });

      // Send input to stdin
      if (input) {
        child.stdin.write(input);
        child.stdin.end();
      }

      // Set timeout
      setTimeout(() => {
        child.kill('SIGKILL');
        resolve({
          success: false,
          output: '',
          error: 'Execution timeout',
          executionTime: this.timeout,
          memoryUsage: 0,
          status: 'timeout'
        });
      }, this.timeout);
    });
  }

  async executePython(code, input, tempDir) {
    const startTime = Date.now();
    const filePath = path.join(tempDir, 'main.py');
    
    await fs.writeFile(filePath, code);
    
    return new Promise((resolve) => {
      const child = spawn('python', [filePath], {
        cwd: tempDir,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let output = '';
      let error = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        error += data.toString();
      });

      child.on('close', (code) => {
        const executionTime = Date.now() - startTime;
        
        resolve({
          success: code === 0,
          output: output.trim(),
          error: error.trim(),
          executionTime,
          memoryUsage: 0,
          status: code === 0 ? 'success' : 'runtime_error',
          exitCode: code
        });
      });

      child.on('error', (err) => {
        const executionTime = Date.now() - startTime;
        resolve({
          success: false,
          output: '',
          error: err.message,
          executionTime,
          memoryUsage: 0,
          status: 'error'
        });
      });

      if (input) {
        child.stdin.write(input);
        child.stdin.end();
      }

      setTimeout(() => {
        child.kill('SIGKILL');
        resolve({
          success: false,
          output: '',
          error: 'Execution timeout',
          executionTime: this.timeout,
          memoryUsage: 0,
          status: 'timeout'
        });
      }, this.timeout);
    });
  }

  async installCompiler(compiler) {
    const { spawn } = require('child_process');
    
    return new Promise((resolve) => {
      let installCommand, installArgs;
      
      if (compiler === 'javac') {
        installCommand = 'apt-get';
        installArgs = ['update'];
      } else if (compiler === 'tsc') {
        installCommand = 'npm';
        installArgs = ['install', '-g', 'typescript'];
      } else {
        resolve(false);
        return;
      }
      
      const installProcess = spawn(installCommand, installArgs, {
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      installProcess.on('close', (code) => {
        if (code === 0 && compiler === 'javac') {
          // For Java, run the actual installation
          const javaInstallProcess = spawn('apt-get', ['install', '-y', 'openjdk-11-jdk'], {
            stdio: ['pipe', 'pipe', 'pipe']
          });
          
          javaInstallProcess.on('close', (javaCode) => {
            resolve(javaCode === 0);
          });
        } else {
          resolve(code === 0);
        }
      });
      
      installProcess.on('error', () => {
        resolve(false);
      });
    });
  }

  async executeJava(code, input, tempDir) {
    const startTime = Date.now();
    
    // Check if Java compiler is available
    const hasCompiler = await this.checkCompiler('javac');
    if (!hasCompiler) {
      // Try to install Java compiler
      console.log('Java compiler not found, attempting to install...');
      const installSuccess = await this.installCompiler('javac');
      if (!installSuccess) {
        return {
          success: false,
          output: '',
          error: 'Java compilation is not available on this server. Java requires system-level installation which is restricted on this hosting platform. Please use JavaScript, Python, TypeScript, C, or C++ instead.',
          executionTime: 0,
          memoryUsage: 0,
          status: 'compiler_not_found'
        };
      }
    }
    
    // Extract class name from code
    const classMatch = code.match(/public\s+class\s+(\w+)/);
    if (!classMatch) {
      return {
        success: false,
        output: '',
        error: 'Java code must contain a public class',
        executionTime: 0,
        memoryUsage: 0,
        status: 'compilation_error'
      };
    }

    const className = classMatch[1];
    const filePath = path.join(tempDir, `${className}.java`);
    
    await fs.writeFile(filePath, code);
    
    return new Promise((resolve) => {
      // Compile Java code
      const compileProcess = spawn('javac', [filePath], {
        cwd: tempDir,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (compileCode) => {
        if (compileCode !== 0) {
          const executionTime = Date.now() - startTime;
          resolve({
            success: false,
            output: '',
            error: compileError.trim(),
            executionTime,
            memoryUsage: 0,
            status: 'compilation_error',
            exitCode: compileCode
          });
          return;
        }

        // Run compiled Java code
        const runProcess = spawn('java', ['-cp', tempDir, className], {
          cwd: tempDir,
          stdio: ['pipe', 'pipe', 'pipe']
        });

        let output = '';
        let error = '';

        runProcess.stdout.on('data', (data) => {
          output += data.toString();
        });

        runProcess.stderr.on('data', (data) => {
          error += data.toString();
        });

        runProcess.on('close', (code) => {
          const executionTime = Date.now() - startTime;
          
          resolve({
            success: code === 0,
            output: output.trim(),
            error: error.trim(),
            executionTime,
            memoryUsage: 0,
            status: code === 0 ? 'success' : 'runtime_error',
            exitCode: code
          });
        });

        runProcess.on('error', (err) => {
          const executionTime = Date.now() - startTime;
          resolve({
            success: false,
            output: '',
            error: err.message,
            executionTime,
            memoryUsage: 0,
            status: 'error'
          });
        });

        if (input) {
          runProcess.stdin.write(input);
          runProcess.stdin.end();
        }

        setTimeout(() => {
          runProcess.kill('SIGKILL');
          resolve({
            success: false,
            output: '',
            error: 'Execution timeout',
            executionTime: this.timeout,
            memoryUsage: 0,
            status: 'timeout'
          });
        }, this.timeout);
      });
    });
  }

  async executeCpp(code, input, tempDir) {
    const startTime = Date.now();
    const filePath = path.join(tempDir, 'main.cpp');
    const executablePath = path.join(tempDir, 'main');
    
    // Check if g++ compiler is available
    const hasCompiler = await this.checkCompiler('g++');
    if (!hasCompiler) {
      return {
        success: false,
        output: '',
        error: 'C++ compiler (g++) not found. Please install MinGW-w64 or MSYS2 to compile C++ code.',
        executionTime: 0,
        memoryUsage: 0,
        status: 'compiler_not_found'
      };
    }
    
    await fs.writeFile(filePath, code);
    
    return new Promise((resolve) => {
      // Compile C++ code
      const compileProcess = spawn('g++', ['-o', 'main', 'main.cpp'], {
        cwd: tempDir,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (compileCode) => {
        if (compileCode !== 0) {
          const executionTime = Date.now() - startTime;
          resolve({
            success: false,
            output: '',
            error: compileError.trim(),
            executionTime,
            memoryUsage: 0,
            status: 'compilation_error',
            exitCode: compileCode
          });
          return;
        }

        // Run compiled C++ code
        const runProcess = spawn('./main', [], {
          cwd: tempDir,
          stdio: ['pipe', 'pipe', 'pipe']
        });

        let output = '';
        let error = '';

        runProcess.stdout.on('data', (data) => {
          output += data.toString();
        });

        runProcess.stderr.on('data', (data) => {
          error += data.toString();
        });

        runProcess.on('close', (code) => {
          const executionTime = Date.now() - startTime;
          
          resolve({
            success: code === 0,
            output: output.trim(),
            error: error.trim(),
            executionTime,
            memoryUsage: 0,
            status: code === 0 ? 'success' : 'runtime_error',
            exitCode: code
          });
        });

        runProcess.on('error', (err) => {
          const executionTime = Date.now() - startTime;
          resolve({
            success: false,
            output: '',
            error: err.message,
            executionTime,
            memoryUsage: 0,
            status: 'error'
          });
        });

        if (input) {
          runProcess.stdin.write(input);
          runProcess.stdin.end();
        }

        setTimeout(() => {
          runProcess.kill('SIGKILL');
          resolve({
            success: false,
            output: '',
            error: 'Execution timeout',
            executionTime: this.timeout,
            memoryUsage: 0,
            status: 'timeout'
          });
        }, this.timeout);
      });
    });
  }

  async executeC(code, input, tempDir) {
    const startTime = Date.now();
    const filePath = path.join(tempDir, 'main.c');
    const executablePath = path.join(tempDir, 'main');
    
    // Check if gcc compiler is available
    const hasCompiler = await this.checkCompiler('gcc');
    if (!hasCompiler) {
      return {
        success: false,
        output: '',
        error: 'C compiler (gcc) not found. Please install MinGW-w64 or MSYS2 to compile C code.',
        executionTime: 0,
        memoryUsage: 0,
        status: 'compiler_not_found'
      };
    }
    
    await fs.writeFile(filePath, code);
    
    return new Promise((resolve) => {
      // Compile C code
      const compileProcess = spawn('gcc', ['-o', 'main', 'main.c'], {
        cwd: tempDir,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (compileCode) => {
        if (compileCode !== 0) {
          const executionTime = Date.now() - startTime;
          resolve({
            success: false,
            output: '',
            error: compileError.trim(),
            executionTime,
            memoryUsage: 0,
            status: 'compilation_error',
            exitCode: compileCode
          });
          return;
        }

        // Run compiled C code
        const runProcess = spawn('./main', [], {
          cwd: tempDir,
          stdio: ['pipe', 'pipe', 'pipe']
        });

        let output = '';
        let error = '';

        runProcess.stdout.on('data', (data) => {
          output += data.toString();
        });

        runProcess.stderr.on('data', (data) => {
          error += data.toString();
        });

        runProcess.on('close', (code) => {
          const executionTime = Date.now() - startTime;
          
          resolve({
            success: code === 0,
            output: output.trim(),
            error: error.trim(),
            executionTime,
            memoryUsage: 0,
            status: code === 0 ? 'success' : 'runtime_error',
            exitCode: code
          });
        });

        runProcess.on('error', (err) => {
          const executionTime = Date.now() - startTime;
          resolve({
            success: false,
            output: '',
            error: err.message,
            executionTime,
            memoryUsage: 0,
            status: 'error'
          });
        });

        if (input) {
          runProcess.stdin.write(input);
          runProcess.stdin.end();
        }

        setTimeout(() => {
          runProcess.kill('SIGKILL');
          resolve({
            success: false,
            output: '',
            error: 'Execution timeout',
            executionTime: this.timeout,
            memoryUsage: 0,
            status: 'timeout'
          });
        }, this.timeout);
      });
    });
  }

  async executeTypeScript(code, input, tempDir) {
    const startTime = Date.now();
    const filePath = path.join(tempDir, 'main.ts');
    const jsFilePath = path.join(tempDir, 'main.js');
    
    await fs.writeFile(filePath, code);
    
    return new Promise((resolve) => {
      // Try multiple approaches to run TypeScript compiler
      const serverDir = path.join(__dirname, '..');
      const tscPath = path.join(serverDir, 'node_modules', '.bin', 'tsc');
      
      // First try: Use the local tsc binary directly
      let compileProcess;
      try {
        compileProcess = spawn(tscPath, [filePath, '--outDir', tempDir, '--target', 'ES2020', '--module', 'commonjs', '--skipLibCheck', '--noEmitOnError'], {
          cwd: tempDir,
          stdio: ['pipe', 'pipe', 'pipe'],
          shell: true
        });
      } catch (error) {
        // Fallback: Use npx
        compileProcess = spawn('npx', ['tsc', filePath, '--outDir', tempDir, '--target', 'ES2020', '--module', 'commonjs', '--skipLibCheck', '--noEmitOnError'], {
          cwd: tempDir,
          stdio: ['pipe', 'pipe', 'pipe'],
          shell: true
        });
      }

      let compileError = '';

      compileProcess.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compileProcess.on('close', (compileCode) => {
        if (compileCode !== 0) {
          const executionTime = Date.now() - startTime;
          resolve({
            success: false,
            output: '',
            error: compileError.trim(),
            executionTime,
            memoryUsage: 0,
            status: 'compilation_error',
            exitCode: compileCode
          });
          return;
        }

        // Run compiled JavaScript
        const runProcess = spawn('node', [path.join(tempDir, 'main.js')], {
          cwd: tempDir,
          stdio: ['pipe', 'pipe', 'pipe']
        });

        let output = '';
        let error = '';

        runProcess.stdout.on('data', (data) => {
          output += data.toString();
        });

        runProcess.stderr.on('data', (data) => {
          error += data.toString();
        });

        runProcess.on('close', (code) => {
          const executionTime = Date.now() - startTime;
          
          resolve({
            success: code === 0,
            output: output.trim(),
            error: error.trim(),
            executionTime,
            memoryUsage: 0,
            status: code === 0 ? 'success' : 'runtime_error',
            exitCode: code
          });
        });

        runProcess.on('error', (err) => {
          const executionTime = Date.now() - startTime;
          resolve({
            success: false,
            output: '',
            error: err.message,
            executionTime,
            memoryUsage: 0,
            status: 'error'
          });
        });

        if (input) {
          runProcess.stdin.write(input);
          runProcess.stdin.end();
        }

        setTimeout(() => {
          runProcess.kill('SIGKILL');
          resolve({
            success: false,
            output: '',
            error: 'Execution timeout',
            executionTime: this.timeout,
            memoryUsage: 0,
            status: 'timeout'
          });
        }, this.timeout);
      });
    });
  }
}

module.exports = CodeExecutor;
