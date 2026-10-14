export interface LanguageConfig {
  id: string;
  name: string;
  shortLabel: string;
  monacoLang: string;
  fileName: string;
  extension: string;
  compilerCmd: string;
  pistonLang: string;
  pistonVersion: string;
  starterCode: string;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    id: "python",
    name: "Python",
    shortLabel: "PY",
    monacoLang: "python",
    fileName: "main.py",
    extension: ".py",
    compilerCmd: "python3 -u main.py",
    pistonLang: "python",
    pistonVersion: "3.10.0",
    starterCode: `# Online Python compiler (interpreter) to run Python online.
# Write and run Python online using this editor.

def main():
    print("Try clicking the Run button.")

if __name__ == "__main__":
    main()
`,
  },
  {
    id: "r",
    name: "R",
    shortLabel: "R",
    monacoLang: "r",
    fileName: "main.r",
    extension: ".r",
    compilerCmd: "Rscript main.r",
    pistonLang: "rscript",
    pistonVersion: "4.1.1",
    starterCode: `# Online R compiler (interpreter)
# Write and run R online using this editor.

cat("Try clicking the Run button.\\n")

x <- c(1, 2, 3, 4, 5)
cat("Mean:", mean(x), "\\n")
`,
  },
  {
    id: "sql",
    name: "SQL",
    shortLabel: "SQL",
    monacoLang: "sql",
    fileName: "main.sql",
    extension: ".sql",
    compilerCmd: "sqlite3 database.db < main.sql",
    pistonLang: "sqlite3",
    pistonVersion: "3.36.0",
    starterCode: `-- Online SQL compiler
-- Write and run SQL queries using this editor.

CREATE TABLE demo (id INTEGER PRIMARY KEY, message TEXT);
INSERT INTO demo (message) VALUES ('Try clicking the Run button.');

SELECT * FROM demo;
`,
  },
  {
    id: "html",
    name: "HTML",
    shortLabel: "HTML",
    monacoLang: "html",
    fileName: "index.html",
    extension: ".html",
    compilerCmd: "browser-render index.html",
    pistonLang: "html",
    pistonVersion: "5",
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Online Preview</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }
        h1 { color: #0B4DF0; }
    </style>
</head>
<body>
    <h1>Try clicking the Run button.</h1>
    <p>HTML & CSS preview mode.</p>
</body>
</html>
`,
  },
  {
    id: "java",
    name: "Java",
    shortLabel: "JAVA",
    monacoLang: "java",
    fileName: "Main.java",
    extension: ".java",
    compilerCmd: "javac Main.java && java Main",
    pistonLang: "java",
    pistonVersion: "15.0.2",
    starterCode: `// Online Java compiler
// Write and run Java online using this editor.

public class Main {
    public static void main(String[] args) {
        System.out.println("Try clicking the Run button.");
    }
}
`,
  },
  {
    id: "kotlin",
    name: "Kotlin",
    shortLabel: "KT",
    monacoLang: "kotlin",
    fileName: "Main.kt",
    extension: ".kt",
    compilerCmd: "kotlinc Main.kt -include-runtime -d Main.jar && java -jar Main.jar",
    pistonLang: "kotlin",
    pistonVersion: "1.8.20",
    starterCode: `// Online Kotlin compiler
// Write and run Kotlin online using this editor.

fun main() {
    println("Try clicking the Run button.")
}
`,
  },
  {
    id: "c",
    name: "C",
    shortLabel: "C",
    monacoLang: "c",
    fileName: "main.c",
    extension: ".c",
    compilerCmd: "gcc -O2 main.c -o main && ./main",
    pistonLang: "c",
    pistonVersion: "10.2.0",
    starterCode: `// Online C compiler (editor)
// Write and run C online using this editor.

#include <stdio.h>

int main() {

    printf("Try clicking the Run button.");
    return 0;
}
`,
  },
  {
    id: "cpp",
    name: "C++",
    shortLabel: "C++",
    monacoLang: "cpp",
    fileName: "main.cpp",
    extension: ".cpp",
    compilerCmd: "g++ -O2 -std=c++20 main.cpp -o main && ./main",
    pistonLang: "cpp",
    pistonVersion: "10.2.0",
    starterCode: `// Online C++ compiler (editor)
// Write and run C++ online using this editor.

#include <iostream>

int main() {
    std::cout << "Try clicking the Run button." << std::endl;
    return 0;
}
`,
  },
  {
    id: "csharp",
    name: "C#",
    shortLabel: "C#",
    monacoLang: "csharp",
    fileName: "Program.cs",
    extension: ".cs",
    compilerCmd: "dotnet run",
    pistonLang: "csharp.net",
    pistonVersion: "7.0.400",
    starterCode: `// Online C# compiler
// Write and run C# online using this editor.

using System;

class Program {
    static void Main() {
        Console.WriteLine("Try clicking the Run button.");
    }
}
`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    shortLabel: "JS",
    monacoLang: "javascript",
    fileName: "main.js",
    extension: ".js",
    compilerCmd: "node main.js",
    pistonLang: "javascript",
    pistonVersion: "18.15.0",
    starterCode: `// Online JavaScript compiler (Node.js)
// Write and run JavaScript online using this editor.

console.log("Try clicking the Run button.");
`,
  },
  {
    id: "typescript",
    name: "TypeScript",
    shortLabel: "TS",
    monacoLang: "typescript",
    fileName: "main.ts",
    extension: ".ts",
    compilerCmd: "ts-node main.ts",
    pistonLang: "typescript",
    pistonVersion: "5.0.3",
    starterCode: `// Online TypeScript compiler
// Write and run TypeScript online using this editor.

const message: string = "Try clicking the Run button.";
console.log(message);
`,
  },
  {
    id: "go",
    name: "Go",
    shortLabel: "GO",
    monacoLang: "go",
    fileName: "main.go",
    extension: ".go",
    compilerCmd: "go build -o main main.go && ./main",
    pistonLang: "go",
    pistonVersion: "1.16.2",
    starterCode: `// Online Go compiler
// Write and run Go online using this editor.

package main

import "fmt"

func main() {
    fmt.Println("Try clicking the Run button.")
}
`,
  },
  {
    id: "rust",
    name: "Rust",
    shortLabel: "RS",
    monacoLang: "rust",
    fileName: "main.rs",
    extension: ".rs",
    compilerCmd: "rustc -O main.rs -o main && ./main",
    pistonLang: "rust",
    pistonVersion: "1.68.2",
    starterCode: `// Online Rust compiler
// Write and run Rust online using this editor.

fn main() {
    println!("Try clicking the Run button.");
}
`,
  },
  {
    id: "scala",
    name: "Scala",
    shortLabel: "SC",
    monacoLang: "scala",
    fileName: "Main.scala",
    extension: ".scala",
    compilerCmd: "scala Main.scala",
    pistonLang: "scala",
    pistonVersion: "3.2.2",
    starterCode: `// Online Scala compiler
// Write and run Scala online using this editor.

object Main extends App {
  println("Try clicking the Run button.")
}
`,
  },
  {
    id: "dart",
    name: "Dart",
    shortLabel: "DART",
    monacoLang: "dart",
    fileName: "main.dart",
    extension: ".dart",
    compilerCmd: "dart run main.dart",
    pistonLang: "dart",
    pistonVersion: "2.19.6",
    starterCode: `// Online Dart compiler
// Write and run Dart online using this editor.

void main() {
  print('Try clicking the Run button.');
}
`,
  },
  {
    id: "ruby",
    name: "Ruby",
    shortLabel: "RB",
    monacoLang: "ruby",
    fileName: "main.rb",
    extension: ".rb",
    compilerCmd: "ruby main.rb",
    pistonLang: "ruby",
    pistonVersion: "3.0.1",
    starterCode: `# Online Ruby compiler
# Write and run Ruby online using this editor.

puts "Try clicking the Run button."
`,
  },
  {
    id: "php",
    name: "PHP",
    shortLabel: "PHP",
    monacoLang: "php",
    fileName: "index.php",
    extension: ".php",
    compilerCmd: "php index.php",
    pistonLang: "php",
    pistonVersion: "8.2.3",
    starterCode: `<?php
// Online PHP compiler
// Write and run PHP online using this editor.

echo "Try clicking the Run button.\\n";
?>
`,
  },
  {
    id: "swift",
    name: "Swift",
    shortLabel: "SWIFT",
    monacoLang: "swift",
    fileName: "main.swift",
    extension: ".swift",
    compilerCmd: "swiftc main.swift -o main && ./main",
    pistonLang: "swift",
    pistonVersion: "5.3.3",
    starterCode: `// Online Swift compiler
// Write and run Swift online using this editor.

import Foundation

print("Try clicking the Run button.")
`,
  },
];

// Default language: C as requested by the starter code reference
export const DEFAULT_LANGUAGE = LANGUAGES.find((l) => l.id === "c") || LANGUAGES[0];
