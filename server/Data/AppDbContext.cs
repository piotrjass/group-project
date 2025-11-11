using Microsoft.EntityFrameworkCore;
using FlashcardsApi.Models;

namespace FlashcardsApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Flashcard> Flashcards { get; set; }
    public DbSet<TestResult> TestResults { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Seed categories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "SQL", Description = "Database and SQL queries" },
            new Category { Id = 2, Name = ".NET", Description = ".NET Framework and C# concepts" },
            new Category { Id = 3, Name = "Java", Description = "Java programming language" },
            new Category { Id = 4, Name = "JavaScript", Description = "JavaScript and web development" },
            new Category { Id = 5, Name = "Python", Description = "Python programming language" }
        );

        // Seed flashcards - SQL (10 cards)
        modelBuilder.Entity<Flashcard>().HasData(
            new Flashcard { Id = 1, CategoryId = 1, Question = "What is a PRIMARY KEY?", Answer = "A PRIMARY KEY is a column or set of columns that uniquely identifies each row in a table. It cannot contain NULL values." },
            new Flashcard { Id = 2, CategoryId = 1, Question = "What is the difference between INNER JOIN and LEFT JOIN?", Answer = "INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table and matching rows from the right table (with NULLs for non-matches)." },
            new Flashcard { Id = 3, CategoryId = 1, Question = "What is normalization?", Answer = "Normalization is the process of organizing data to reduce redundancy and improve data integrity by dividing tables and establishing relationships." },
            new Flashcard { Id = 4, CategoryId = 1, Question = "What is an INDEX?", Answer = "An INDEX is a database structure that improves the speed of data retrieval operations on a table at the cost of additional storage and slower writes." },
            new Flashcard { Id = 5, CategoryId = 1, Question = "What is a FOREIGN KEY?", Answer = "A FOREIGN KEY is a column that creates a relationship between two tables by referencing the PRIMARY KEY of another table." },
            new Flashcard { Id = 6, CategoryId = 1, Question = "What is a VIEW?", Answer = "A VIEW is a virtual table based on a SQL query that can simplify complex queries and provide security by restricting access to specific data." },
            new Flashcard { Id = 7, CategoryId = 1, Question = "What is a TRANSACTION?", Answer = "A TRANSACTION is a sequence of operations performed as a single logical unit of work that must be completed entirely or not at all (ACID properties)." },
            new Flashcard { Id = 8, CategoryId = 1, Question = "What does GROUP BY do?", Answer = "GROUP BY groups rows with the same values in specified columns and is often used with aggregate functions like COUNT, SUM, AVG, MAX, MIN." },
            new Flashcard { Id = 9, CategoryId = 1, Question = "What is the difference between WHERE and HAVING?", Answer = "WHERE filters rows before grouping, while HAVING filters groups after GROUP BY. HAVING is used with aggregate functions." },
            new Flashcard { Id = 10, CategoryId = 1, Question = "What is a stored procedure?", Answer = "A stored procedure is a prepared SQL code that can be saved and reused, accepting parameters and containing control flow logic." },

            // .NET (10 cards)
            new Flashcard { Id = 11, CategoryId = 2, Question = "What is the difference between struct and class in C#?", Answer = "Struct is a value type stored on the stack, while class is a reference type stored on the heap. Structs don't support inheritance." },
            new Flashcard { Id = 12, CategoryId = 2, Question = "What is async/await in C#?", Answer = "async/await is a pattern for asynchronous programming that allows non-blocking execution without explicitly managing threads or callbacks." },
            new Flashcard { Id = 13, CategoryId = 2, Question = "What is dependency injection?", Answer = "Dependency injection is a design pattern where dependencies are provided to a class rather than the class creating them, improving testability and loose coupling." },
            new Flashcard { Id = 14, CategoryId = 2, Question = "What is LINQ?", Answer = "LINQ (Language Integrated Query) is a feature in .NET that provides query capabilities directly in C# for collections, databases, and XML." },
            new Flashcard { Id = 15, CategoryId = 2, Question = "What is the difference between IEnumerable and IQueryable?", Answer = "IEnumerable executes queries in memory (LINQ to Objects), while IQueryable translates to external query language like SQL for deferred execution." },
            new Flashcard { Id = 16, CategoryId = 2, Question = "What is middleware in ASP.NET Core?", Answer = "Middleware is software assembled into an app pipeline to handle requests and responses. Each component can perform operations before and after the next component." },
            new Flashcard { Id = 17, CategoryId = 2, Question = "What is the difference between Task and Thread?", Answer = "Thread represents an actual OS thread, while Task is a higher-level abstraction representing an asynchronous operation that may or may not use a thread." },
            new Flashcard { Id = 18, CategoryId = 2, Question = "What is garbage collection in .NET?", Answer = "Garbage collection is automatic memory management that reclaims memory occupied by objects that are no longer in use by the application." },
            new Flashcard { Id = 19, CategoryId = 2, Question = "What is Entity Framework?", Answer = "Entity Framework is an ORM (Object-Relational Mapping) framework that enables .NET developers to work with databases using .NET objects." },
            new Flashcard { Id = 20, CategoryId = 2, Question = "What are extension methods in C#?", Answer = "Extension methods allow adding new methods to existing types without modifying them, using static methods with the 'this' keyword on the first parameter." },

            // Java (10 cards)
            new Flashcard { Id = 21, CategoryId = 3, Question = "What is the difference between JDK, JRE, and JVM?", Answer = "JVM executes Java bytecode. JRE includes JVM and libraries to run Java apps. JDK includes JRE plus development tools like compiler." },
            new Flashcard { Id = 22, CategoryId = 3, Question = "What is the difference between == and .equals()?", Answer = "== compares object references (memory addresses), while .equals() compares object values/content based on the overridden implementation." },
            new Flashcard { Id = 23, CategoryId = 3, Question = "What is polymorphism in Java?", Answer = "Polymorphism allows objects to take multiple forms. Method overriding (runtime) and method overloading (compile-time) are two types." },
            new Flashcard { Id = 24, CategoryId = 3, Question = "What is the difference between abstract class and interface?", Answer = "Abstract classes can have state and implementation. Interfaces (pre-Java 8) only have method signatures. A class can implement multiple interfaces but extend only one class." },
            new Flashcard { Id = 25, CategoryId = 3, Question = "What is a lambda expression?", Answer = "Lambda expressions (Java 8+) are anonymous functions that provide a clear and concise way to implement functional interfaces using the arrow (->) syntax." },
            new Flashcard { Id = 26, CategoryId = 3, Question = "What is the purpose of the 'final' keyword?", Answer = "final makes variables constant, prevents method overriding, and prevents class inheritance depending on where it's applied." },
            new Flashcard { Id = 27, CategoryId = 3, Question = "What is a Stream in Java 8?", Answer = "Stream is a sequence of elements supporting sequential and parallel aggregate operations, enabling functional-style operations on collections." },
            new Flashcard { Id = 28, CategoryId = 3, Question = "What is exception handling in Java?", Answer = "Exception handling uses try-catch-finally blocks to handle runtime errors. Checked exceptions must be caught or declared, unchecked exceptions don't." },
            new Flashcard { Id = 29, CategoryId = 3, Question = "What is the difference between ArrayList and LinkedList?", Answer = "ArrayList uses dynamic array (fast random access, slow insertions). LinkedList uses doubly-linked list (slow random access, fast insertions/deletions)." },
            new Flashcard { Id = 30, CategoryId = 3, Question = "What is multithreading in Java?", Answer = "Multithreading allows concurrent execution of two or more threads. Can be implemented by extending Thread class or implementing Runnable interface." },

            // JavaScript (10 cards)
            new Flashcard { Id = 31, CategoryId = 4, Question = "What is the difference between var, let, and const?", Answer = "var is function-scoped and hoisted. let is block-scoped and not hoisted. const is block-scoped, not hoisted, and cannot be reassigned." },
            new Flashcard { Id = 32, CategoryId = 4, Question = "What is a closure?", Answer = "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned." },
            new Flashcard { Id = 33, CategoryId = 4, Question = "What is the event loop?", Answer = "The event loop handles asynchronous callbacks in JavaScript. It continuously checks the call stack and callback queue, executing queued callbacks when the stack is empty." },
            new Flashcard { Id = 34, CategoryId = 4, Question = "What is the difference between == and ===?", Answer = "== performs type coercion before comparison. === (strict equality) compares both value and type without coercion." },
            new Flashcard { Id = 35, CategoryId = 4, Question = "What are Promises?", Answer = "Promises represent eventual completion or failure of an asynchronous operation, providing .then(), .catch(), and .finally() methods." },
            new Flashcard { Id = 36, CategoryId = 4, Question = "What is async/await?", Answer = "async/await is syntactic sugar over Promises, making asynchronous code look and behave like synchronous code, improving readability." },
            new Flashcard { Id = 37, CategoryId = 4, Question = "What is the 'this' keyword?", Answer = "this refers to the object that is executing the current function. Its value depends on how the function is called (context)." },
            new Flashcard { Id = 38, CategoryId = 4, Question = "What is prototypal inheritance?", Answer = "Objects inherit properties and methods from other objects through prototypes. Every object has a prototype object from which it inherits." },
            new Flashcard { Id = 39, CategoryId = 4, Question = "What is the difference between map() and forEach()?", Answer = "map() creates a new array with transformed elements and returns it. forEach() executes a function for each element but returns undefined." },
            new Flashcard { Id = 40, CategoryId = 4, Question = "What is destructuring?", Answer = "Destructuring is syntax for unpacking values from arrays or properties from objects into distinct variables in a concise way." },

            // Python (10 cards)
            new Flashcard { Id = 41, CategoryId = 5, Question = "What is the difference between list and tuple?", Answer = "Lists are mutable (can be changed) and use square brackets []. Tuples are immutable (cannot be changed) and use parentheses ()." },
            new Flashcard { Id = 42, CategoryId = 5, Question = "What is a decorator?", Answer = "A decorator is a function that modifies the behavior of another function or class. It uses @decorator syntax and is used for cross-cutting concerns." },
            new Flashcard { Id = 43, CategoryId = 5, Question = "What is the difference between deep copy and shallow copy?", Answer = "Shallow copy creates a new object but references same nested objects. Deep copy creates a completely independent copy with new nested objects." },
            new Flashcard { Id = 44, CategoryId = 5, Question = "What is a generator?", Answer = "A generator is a function that uses yield to return values lazily, one at a time, maintaining state between calls. Memory efficient for large sequences." },
            new Flashcard { Id = 45, CategoryId = 5, Question = "What is list comprehension?", Answer = "List comprehension is a concise syntax for creating lists by applying an expression to each item in an iterable, optionally with filtering." },
            new Flashcard { Id = 46, CategoryId = 5, Question = "What is the Global Interpreter Lock (GIL)?", Answer = "GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously." },
            new Flashcard { Id = 47, CategoryId = 5, Question = "What are *args and **kwargs?", Answer = "*args allows passing variable number of positional arguments. **kwargs allows passing variable number of keyword arguments as a dictionary." },
            new Flashcard { Id = 48, CategoryId = 5, Question = "What is the difference between staticmethod and classmethod?", Answer = "staticmethod doesn't receive implicit first argument. classmethod receives the class as the first argument (cls). Both don't need an instance." },
            new Flashcard { Id = 49, CategoryId = 5, Question = "What is a lambda function?", Answer = "Lambda is an anonymous function defined with lambda keyword. It's a one-line function that can have multiple arguments but only one expression." },
            new Flashcard { Id = 50, CategoryId = 5, Question = "What is the difference between .py and .pyc files?", Answer = ".py files contain Python source code. .pyc files contain compiled bytecode for faster loading. Python creates .pyc automatically in __pycache__." }
        );
    }
}
