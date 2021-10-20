var documenterSearchIndex = {"docs":
[{"location":"#SQLite.jl-Documentation","page":"Home","title":"SQLite.jl Documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#High-level-interface","page":"Home","title":"High-level interface","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"DBInterface.execute\nSQLite.load!","category":"page"},{"location":"#DBInterface.execute","page":"Home","title":"DBInterface.execute","text":"DBInterface.execute(db::SQLite.DB, sql::String, [params])\nDBInterface.execute(stmt::SQLite.Stmt, [params])\n\nBind any positional (params as Vector or Tuple) or named (params as NamedTuple or Dict) parameters to an SQL statement, given by db and sql or as an already prepared statement stmt, execute the query and return an iterator of result rows.\n\nNote that the returned result row iterator only supports a single-pass, forward-only iteration of the result rows. Calling SQLite.reset!(result) will re-execute the query and reset the iterator back to the beginning.\n\nThe resultset iterator supports the Tables.jl interface, so results can be collected in any Tables.jl-compatible sink, like DataFrame(results), CSV.write(\"results.csv\", results), etc.\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.load!","page":"Home","title":"SQLite.load!","text":"source |> SQLite.load!(db::SQLite.DB, tablename::String; temp::Bool=false, ifnotexists::Bool=false, replace::Bool=false, analyze::Bool=false)\nSQLite.load!(source, db, tablename; temp=false, ifnotexists=false, replace::Bool=false, analyze::Bool=false)\n\nLoad a Tables.jl input source into an SQLite table that will be named tablename (will be auto-generated if not specified).\n\ntemp=true will create a temporary SQLite table that will be destroyed automatically when the database is closed\nifnotexists=false will throw an error if tablename already exists in db\nreplace=false controls whether an INSERT INTO ... statement is generated or a REPLACE INTO ...\nanalyze=true will execute ANALYZE at the end of the insert\n\n\n\n\n\n","category":"function"},{"location":"#Types/Functions","page":"Home","title":"Types/Functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SQLite.DB\nSQLite.Stmt\nSQLite.bind!\nSQLite.createtable!\nSQLite.drop!\nSQLite.dropindex!\nSQLite.createindex!\nSQLite.removeduplicates!\nSQLite.tables\nSQLite.columns\nSQLite.indices\nSQLite.enable_load_extension\nSQLite.register\nSQLite.@register\nSQLite.@sr_str\nSQLite.sqlreturn","category":"page"},{"location":"#SQLite.DB","page":"Home","title":"SQLite.DB","text":"`SQLite.DB()` => in-memory SQLite database\n`SQLite.DB(file)` => file-based SQLite database\n\nConstructors for a representation of an sqlite database, either backed by an on-disk file or in-memory.\n\nSQLite.DB requires the file string argument in the 2nd definition as the name of either a pre-defined SQLite database to be opened, or if the file doesn't exist, a database will be created. Note that only sqlite 3.x version files are supported.\n\nThe SQLite.DB object represents a single connection to an SQLite database. All other SQLite.jl functions take an SQLite.DB as the first argument as context.\n\nTo create an in-memory temporary database, call SQLite.DB().\n\nThe SQLite.DB will be automatically closed/shutdown when it goes out of scope (i.e. the end of the Julia session, end of a function call wherein it was created, etc.)\n\n\n\n\n\n","category":"type"},{"location":"#SQLite.Stmt","page":"Home","title":"SQLite.Stmt","text":"SQLite.Stmt(db, sql) => SQL.Stmt\n\nPrepares an optimized internal representation of SQL statement in the context of the provided SQLite3 db and constructs the SQLite.Stmt Julia object that holds a reference to the prepared statement.\n\nNote: the sql statement is not actually executed, but only compiled (mainly for usage where the same statement is executed multiple times with different parameters bound as values).\n\nInternally SQLite.Stmt constructor creates the SQLite._Stmt object that is managed by db. SQLite.Stmt references the SQLite._Stmt by its unique id.\n\nThe SQLite.Stmt will be automatically closed/shutdown when it goes out of scope (i.e. the end of the Julia session, end of a function call wherein it was created, etc.). One can also call DBInterface.close!(stmt) to immediately close it.\n\nAll prepared statements of a given DB connection are also automatically closed when the DB is disconnected or when SQLite.finalize_statements! is explicitly called.\n\n\n\n\n\n","category":"type"},{"location":"#SQLite.bind!","page":"Home","title":"SQLite.bind!","text":"SQLite.bind!(stmt::SQLite.Stmt, values)\n\nbind values to parameters in a prepared SQLite.Stmt. Values can be:\n\nVector or Tuple: where each element will be bound to an SQL parameter by index order\nDict or NamedTuple; where values will be bound to named SQL parameters by the Dict/NamedTuple key\n\nAdditional methods exist for working individual SQL parameters:\n\nSQLite.bind!(stmt, name, val): bind a single value to a named SQL parameter\nSQLite.bind!(stmt, index, val): bind a single value to a SQL parameter by index number\n\nFrom the SQLite documentation:\n\nUsually, though, it is not useful to evaluate exactly the same SQL statement more than once. More often, one wants to evaluate similar statements. For example, you might want to evaluate an INSERT statement multiple times though with different values to insert. To accommodate this kind of flexibility, SQLite allows SQL statements to contain parameters which are \"bound\" to values prior to being evaluated. These values can later be changed and the same prepared statement can be evaluated a second time using the new values.In SQLite, wherever it is valid to include a string literal, one can use a parameter in one of the following forms:?\n?NNN\n:AAA\n$AAA\n@AAAIn the examples above, NNN is an integer value and AAA is an identifier. A parameter initially has a value of NULL. Prior to calling sqlite3_step() for the first time or immediately after sqlite3_reset(), the application can invoke one of thesqlite3bind()interfaces to attach values to the parameters. Each call tosqlite3bind()` overrides prior bindings on the same parameter.\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.createtable!","page":"Home","title":"SQLite.createtable!","text":"SQLite.createtable!(db::SQLite.DB, table_name, schema::Tables.Schema; temp=false, ifnotexists=true)\n\nCreate a table in db with name table_name, according to schema, which is a set of column names and types, constructed like Tables.Schema(names, types) where names can be a vector or tuple of String/Symbol column names, and types is a vector or tuple of sqlite-compatible types (Int, Float64, String, or unions of Missing).\n\nIf temp=true, the table will be created temporarily, which means it will be deleted when the db is closed. If ifnotexists=true, no error will be thrown if the table already exists.\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.drop!","page":"Home","title":"SQLite.drop!","text":"SQLite.drop!(db, table; ifexists::Bool=true)\n\ndrop the SQLite table table from the database db; ifexists=true will prevent an error being thrown if table doesn't exist\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.dropindex!","page":"Home","title":"SQLite.dropindex!","text":"SQLite.dropindex!(db, index; ifexists::Bool=true)\n\ndrop the SQLite index index from the database db; ifexists=true will not return an error if index doesn't exist\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.createindex!","page":"Home","title":"SQLite.createindex!","text":"SQLite.createindex!(db, table, index, cols; unique=true, ifnotexists=false)\n\ncreate the SQLite index index on the table table using cols, which may be a single column or vector of columns. unique specifies whether the index will be unique or not. ifnotexists=true will not throw an error if the index already exists\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.removeduplicates!","page":"Home","title":"SQLite.removeduplicates!","text":"SQLite.removeduplicates!(db, table, cols)\n\nRemoves duplicate rows from table based on the values in cols, which is an array of column names.\n\nA convenience method for the common task of removing duplicate rows in a dataset according to some subset of columns that make up a \"primary key\".\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.tables","page":"Home","title":"SQLite.tables","text":"SQLite.tables(db, sink=columntable)\n\nreturns a list of tables in db\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.columns","page":"Home","title":"SQLite.columns","text":"SQLite.columns(db, table, sink=columntable)\n\nreturns a list of columns in table\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.indices","page":"Home","title":"SQLite.indices","text":"SQLite.indices(db, sink=columntable)\n\nreturns a list of indices in db\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.enable_load_extension","page":"Home","title":"SQLite.enable_load_extension","text":"SQLite.enable_load_extension(db, enable::Bool=true)\n\nEnables extension loading (off by default) on the sqlite database db. Pass false as the second argument to disable.\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.register","page":"Home","title":"SQLite.register","text":"SQLite.register(db, func)\nSQLite.register(db, init, step_func, final_func; nargs=-1, name=string(step), isdeterm=true)\n\nRegister a scalar (first method) or aggregate (second method) function with a SQLite.DB.\n\n\n\n\n\n","category":"function"},{"location":"#SQLite.@register","page":"Home","title":"SQLite.@register","text":"SQLite.@register db function\n\nUser-facing macro for convenience in registering a simple function with no configurations needed\n\n\n\n\n\n","category":"macro"},{"location":"#SQLite.@sr_str","page":"Home","title":"SQLite.@sr_str","text":"sr\"...\"\n\nThis string literal is used to escape all special characters in the string, useful for using regex in a query.\n\n\n\n\n\n","category":"macro"},{"location":"#SQLite.sqlreturn","page":"Home","title":"SQLite.sqlreturn","text":"This function should never be called explicitly. Instead it is exported so that it can be overloaded when necessary, see below.\n\n\n\n\n\n","category":"function"},{"location":"#User-Defined-Functions","page":"Home","title":"User Defined Functions","text":"","category":"section"},{"location":"#regex","page":"Home","title":"SQLite Regular Expressions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SQLite provides syntax for calling the regexp function from inside WHERE clauses. Unfortunately, however, sqlite does not provide a default implementation of the regexp function. It can be easily added, however, by calling SQLite.@register db SQLite.regexp","category":"page"},{"location":"","page":"Home","title":"Home","text":"The function can be called in the following ways (examples using the Chinook Database)","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using SQLite\n\njulia> db = SQLite.DB(\"Chinook_Sqlite.sqlite\")\n\njulia> # using SQLite's in-built syntax\n\njulia> DBInterface.execute(db, \"SELECT FirstName, LastName FROM Employee WHERE LastName REGEXP 'e(?=a)'\") |> DataFrame\n1x2 ResultSet\n| Row | \"FirstName\" | \"LastName\" |\n|-----|-------------|------------|\n| 1   | \"Jane\"      | \"Peacock\"  |\n\njulia> # explicitly calling the regexp() function\n\njulia> DBInterface.execute(db, \"SELECT * FROM Genre WHERE regexp('e[trs]', Name)\") |> DataFrame\n6x2 ResultSet\n| Row | \"GenreId\" | \"Name\"               |\n|-----|-----------|----------------------|\n| 1   | 3         | \"Metal\"              |\n| 2   | 4         | \"Alternative & Punk\" |\n| 3   | 6         | \"Blues\"              |\n| 4   | 13        | \"Heavy Metal\"        |\n| 5   | 23        | \"Alternative\"        |\n| 6   | 25        | \"Opera\"              |\n\njulia> # you can even do strange things like this if you really want\n\njulia> DBInterface.execute(db, \"SELECT * FROM Genre ORDER BY GenreId LIMIT 2\") |> DataFrame\n2x2 ResultSet\n| Row | \"GenreId\" | \"Name\" |\n|-----|-----------|--------|\n| 1   | 1         | \"Rock\" |\n| 2   | 2         | \"Jazz\" |\n\njulia> DBInterface.execute(db, \"INSERT INTO Genre VALUES (regexp('^word', 'this is a string'), 'My Genre')\") |> DataFrame\n1x1 ResultSet\n| Row | \"Rows Affected\" |\n|-----|-----------------|\n| 1   | 0               |\n\njulia> DBInterface.execute(db, \"SELECT * FROM Genre ORDER BY GenreId LIMIT 2\") |> DataFrame\n2x2 ResultSet\n| Row | \"GenreId\" | \"Name\"     |\n|-----|-----------|------------|\n| 1   | 0         | \"My Genre\" |\n| 2   | 1         | \"Rock\"     |","category":"page"},{"location":"","page":"Home","title":"Home","text":"Due to the heavy use of escape characters, you may run into problems where julia parses out some backslashes in your query, for example \"\\y\" simply becomes \"y\". For example, the following two queries are identical:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> DBInterface.execute(db, \"SELECT * FROM MediaType WHERE Name REGEXP '-\\d'\") |> DataFrame\n1x1 ResultSet\n| Row | \"Rows Affected\" |\n|-----|-----------------|\n| 1   | 0               |\n\njulia> DBInterface.execute(db, \"SELECT * FROM MediaType WHERE Name REGEXP '-d'\") |> DataFrame\n1x1 ResultSet\n| Row | \"Rows Affected\" |\n|-----|-----------------|\n| 1   | 0               |","category":"page"},{"location":"","page":"Home","title":"Home","text":"This can be avoided in two ways. You can either escape each backslash yourself or you can use the sr\"...\" string literal that SQLite.jl exports. The previous query can then successfully be run like so:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> # manually escaping backslashes\n\njulia> DBInterface.execute(db, \"SELECT * FROM MediaType WHERE Name REGEXP '-\\\\d'\") |> DataFrame\n1x2 ResultSet\n| Row | \"MediaTypeId\" | \"Name\"                        |\n|-----|---------------|-------------------------------|\n| 1   | 3             | \"Protected MPEG-4 video file\" |\n\njulia> # using sr\"...\"\n\njulia> DBInterface.execute(db, sr\"SELECT * FROM MediaType WHERE Name REGEXP '-\\d'\") |> DataFrame\n1x2 ResultSet\n| Row | \"MediaTypeId\" | \"Name\"                        |\n|-----|---------------|-------------------------------|\n| 1   | 3             | \"Protected MPEG-4 video file\" |","category":"page"},{"location":"","page":"Home","title":"Home","text":"The sr\"...\" currently escapes all special characters in a string but it may be changed in the future to escape only characters which are part of a regex.","category":"page"},{"location":"#Custom-Scalar-Functions","page":"Home","title":"Custom Scalar Functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SQLite.jl also provides a way that you can implement your own Scalar Functions. This is done using the SQLite.register function and  macro.","category":"page"},{"location":"","page":"Home","title":"Home","text":"SQLite.@register takes a SQLite.DB and a function. The function can be in block syntax:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> SQLite.@register db function add3(x)\n       x + 3\n       end","category":"page"},{"location":"","page":"Home","title":"Home","text":"inline function syntax:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> SQLite.@register db mult3(x) = 3 * x","category":"page"},{"location":"","page":"Home","title":"Home","text":"and previously defined functions:","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> SQLite.@register db sin","category":"page"},{"location":"","page":"Home","title":"Home","text":"The SQLite.register function takes optional arguments; nargs which defaults to -1, name which defaults to the name of the function, isdeterm which defaults to true. In practice these rarely need to be used.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The SQLite.register function uses the SQLite.sqlreturn function to return your function's return value to SQLite. By default, sqlreturn maps the returned value to a native SQLite type or, failing that, serializes the julia value and stores it as a BLOB. To change this behaviour simply define a new method for sqlreturn which then calls a previously defined method for sqlreturn. Methods which map to native SQLite types are","category":"page"},{"location":"","page":"Home","title":"Home","text":"sqlreturn(context, ::NullType)\nsqlreturn(context, val::Int32)\nsqlreturn(context, val::Int64)\nsqlreturn(context, val::Float64)\nsqlreturn(context, val::UTF16String)\nsqlreturn(context, val::String)\nsqlreturn(context, val::Any)","category":"page"},{"location":"","page":"Home","title":"Home","text":"As an example, say you would like BigInts to be stored as TEXT rather than a BLOB. You would simply need to define the following method:","category":"page"},{"location":"","page":"Home","title":"Home","text":"sqlreturn(context, val::BigInt) = sqlreturn(context, string(val))","category":"page"},{"location":"","page":"Home","title":"Home","text":"Another example is the SQLite.sqlreturn used by the regexp function. For regexp to work correctly, it must return it must return an Int (more specifically a 0 or 1) but occursin (used by regexp) returns a Bool. For this reason the following method was defined:","category":"page"},{"location":"","page":"Home","title":"Home","text":"sqlreturn(context, val::Bool) = sqlreturn(context, int(val))","category":"page"},{"location":"","page":"Home","title":"Home","text":"Any new method defined for sqlreturn must take two arguments and must pass the first argument straight through as the first argument.","category":"page"},{"location":"#Custom-Aggregate-Functions","page":"Home","title":"Custom Aggregate Functions","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Using the SQLite.register function, you can also define your own aggregate functions with largely the same semantics.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The SQLite.register function for aggregates must take a SQLite.DB, an initial value, a step function and a final function. The first argument to the step function will be the return value of the previous function (or the initial value if it is the first iteration). The final function must take a single argument which will be the return value of the last step function.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> dsum(prev, cur) = prev + cur\n\njulia> dsum(prev) = 2 * prev\n\njulia> SQLite.register(db, 0, dsum, dsum)","category":"page"},{"location":"","page":"Home","title":"Home","text":"If no name is given, the name of the first (step) function is used (in this case \"dsum\"). You can also use lambdas; the following does the same as the previous code snippet","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> SQLite.register(db, 0, (p,c) -> p+c, p -> 2p, name=\"dsum\")","category":"page"}]
}
