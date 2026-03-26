
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SoldListing
 * 
 */
export type SoldListing = $Result.DefaultSelection<Prisma.$SoldListingPayload>
/**
 * Model SyncLog
 * 
 */
export type SyncLog = $Result.DefaultSelection<Prisma.$SyncLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more SoldListings
 * const soldListings = await prisma.soldListing.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more SoldListings
   * const soldListings = await prisma.soldListing.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.soldListing`: Exposes CRUD operations for the **SoldListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SoldListings
    * const soldListings = await prisma.soldListing.findMany()
    * ```
    */
  get soldListing(): Prisma.SoldListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SyncLogs
    * const syncLogs = await prisma.syncLog.findMany()
    * ```
    */
  get syncLog(): Prisma.SyncLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    SoldListing: 'SoldListing',
    SyncLog: 'SyncLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "soldListing" | "syncLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SoldListing: {
        payload: Prisma.$SoldListingPayload<ExtArgs>
        fields: Prisma.SoldListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SoldListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SoldListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>
          }
          findFirst: {
            args: Prisma.SoldListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SoldListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>
          }
          findMany: {
            args: Prisma.SoldListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>[]
          }
          create: {
            args: Prisma.SoldListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>
          }
          createMany: {
            args: Prisma.SoldListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SoldListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>[]
          }
          delete: {
            args: Prisma.SoldListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>
          }
          update: {
            args: Prisma.SoldListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>
          }
          deleteMany: {
            args: Prisma.SoldListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SoldListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SoldListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>[]
          }
          upsert: {
            args: Prisma.SoldListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SoldListingPayload>
          }
          aggregate: {
            args: Prisma.SoldListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSoldListing>
          }
          groupBy: {
            args: Prisma.SoldListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SoldListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SoldListingCountArgs<ExtArgs>
            result: $Utils.Optional<SoldListingCountAggregateOutputType> | number
          }
        }
      }
      SyncLog: {
        payload: Prisma.$SyncLogPayload<ExtArgs>
        fields: Prisma.SyncLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SyncLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SyncLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findFirst: {
            args: Prisma.SyncLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SyncLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          findMany: {
            args: Prisma.SyncLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          create: {
            args: Prisma.SyncLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          createMany: {
            args: Prisma.SyncLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SyncLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          delete: {
            args: Prisma.SyncLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          update: {
            args: Prisma.SyncLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          deleteMany: {
            args: Prisma.SyncLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SyncLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SyncLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>[]
          }
          upsert: {
            args: Prisma.SyncLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SyncLogPayload>
          }
          aggregate: {
            args: Prisma.SyncLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSyncLog>
          }
          groupBy: {
            args: Prisma.SyncLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SyncLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SyncLogCountArgs<ExtArgs>
            result: $Utils.Optional<SyncLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    soldListing?: SoldListingOmit
    syncLog?: SyncLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model SoldListing
   */

  export type AggregateSoldListing = {
    _count: SoldListingCountAggregateOutputType | null
    _avg: SoldListingAvgAggregateOutputType | null
    _sum: SoldListingSumAggregateOutputType | null
    _min: SoldListingMinAggregateOutputType | null
    _max: SoldListingMaxAggregateOutputType | null
  }

  export type SoldListingAvgAggregateOutputType = {
    id: number | null
    beds: number | null
    baths: number | null
    sqft: number | null
    lotSize: number | null
    yearBuilt: number | null
    garageSpaces: number | null
    closePrice: number | null
    listPrice: number | null
    daysOnMarket: number | null
    latitude: number | null
    longitude: number | null
  }

  export type SoldListingSumAggregateOutputType = {
    id: number | null
    beds: number | null
    baths: number | null
    sqft: number | null
    lotSize: number | null
    yearBuilt: number | null
    garageSpaces: number | null
    closePrice: number | null
    listPrice: number | null
    daysOnMarket: number | null
    latitude: number | null
    longitude: number | null
  }

  export type SoldListingMinAggregateOutputType = {
    id: number | null
    mlsId: string | null
    address: string | null
    city: string | null
    zip: string | null
    beds: number | null
    baths: number | null
    sqft: number | null
    lotSize: number | null
    yearBuilt: number | null
    garageSpaces: number | null
    closePrice: number | null
    listPrice: number | null
    closeDate: string | null
    daysOnMarket: number | null
    subdivision: string | null
    latitude: number | null
    longitude: number | null
    publicRemarks: string | null
    conditionSignal: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SoldListingMaxAggregateOutputType = {
    id: number | null
    mlsId: string | null
    address: string | null
    city: string | null
    zip: string | null
    beds: number | null
    baths: number | null
    sqft: number | null
    lotSize: number | null
    yearBuilt: number | null
    garageSpaces: number | null
    closePrice: number | null
    listPrice: number | null
    closeDate: string | null
    daysOnMarket: number | null
    subdivision: string | null
    latitude: number | null
    longitude: number | null
    publicRemarks: string | null
    conditionSignal: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SoldListingCountAggregateOutputType = {
    id: number
    mlsId: number
    address: number
    city: number
    zip: number
    beds: number
    baths: number
    sqft: number
    lotSize: number
    yearBuilt: number
    garageSpaces: number
    closePrice: number
    listPrice: number
    closeDate: number
    daysOnMarket: number
    subdivision: number
    latitude: number
    longitude: number
    publicRemarks: number
    conditionSignal: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SoldListingAvgAggregateInputType = {
    id?: true
    beds?: true
    baths?: true
    sqft?: true
    lotSize?: true
    yearBuilt?: true
    garageSpaces?: true
    closePrice?: true
    listPrice?: true
    daysOnMarket?: true
    latitude?: true
    longitude?: true
  }

  export type SoldListingSumAggregateInputType = {
    id?: true
    beds?: true
    baths?: true
    sqft?: true
    lotSize?: true
    yearBuilt?: true
    garageSpaces?: true
    closePrice?: true
    listPrice?: true
    daysOnMarket?: true
    latitude?: true
    longitude?: true
  }

  export type SoldListingMinAggregateInputType = {
    id?: true
    mlsId?: true
    address?: true
    city?: true
    zip?: true
    beds?: true
    baths?: true
    sqft?: true
    lotSize?: true
    yearBuilt?: true
    garageSpaces?: true
    closePrice?: true
    listPrice?: true
    closeDate?: true
    daysOnMarket?: true
    subdivision?: true
    latitude?: true
    longitude?: true
    publicRemarks?: true
    conditionSignal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SoldListingMaxAggregateInputType = {
    id?: true
    mlsId?: true
    address?: true
    city?: true
    zip?: true
    beds?: true
    baths?: true
    sqft?: true
    lotSize?: true
    yearBuilt?: true
    garageSpaces?: true
    closePrice?: true
    listPrice?: true
    closeDate?: true
    daysOnMarket?: true
    subdivision?: true
    latitude?: true
    longitude?: true
    publicRemarks?: true
    conditionSignal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SoldListingCountAggregateInputType = {
    id?: true
    mlsId?: true
    address?: true
    city?: true
    zip?: true
    beds?: true
    baths?: true
    sqft?: true
    lotSize?: true
    yearBuilt?: true
    garageSpaces?: true
    closePrice?: true
    listPrice?: true
    closeDate?: true
    daysOnMarket?: true
    subdivision?: true
    latitude?: true
    longitude?: true
    publicRemarks?: true
    conditionSignal?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SoldListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoldListing to aggregate.
     */
    where?: SoldListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoldListings to fetch.
     */
    orderBy?: SoldListingOrderByWithRelationInput | SoldListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SoldListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoldListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoldListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SoldListings
    **/
    _count?: true | SoldListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SoldListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SoldListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SoldListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SoldListingMaxAggregateInputType
  }

  export type GetSoldListingAggregateType<T extends SoldListingAggregateArgs> = {
        [P in keyof T & keyof AggregateSoldListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSoldListing[P]>
      : GetScalarType<T[P], AggregateSoldListing[P]>
  }




  export type SoldListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SoldListingWhereInput
    orderBy?: SoldListingOrderByWithAggregationInput | SoldListingOrderByWithAggregationInput[]
    by: SoldListingScalarFieldEnum[] | SoldListingScalarFieldEnum
    having?: SoldListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SoldListingCountAggregateInputType | true
    _avg?: SoldListingAvgAggregateInputType
    _sum?: SoldListingSumAggregateInputType
    _min?: SoldListingMinAggregateInputType
    _max?: SoldListingMaxAggregateInputType
  }

  export type SoldListingGroupByOutputType = {
    id: number
    mlsId: string
    address: string
    city: string | null
    zip: string | null
    beds: number | null
    baths: number | null
    sqft: number | null
    lotSize: number | null
    yearBuilt: number | null
    garageSpaces: number | null
    closePrice: number | null
    listPrice: number | null
    closeDate: string | null
    daysOnMarket: number | null
    subdivision: string | null
    latitude: number | null
    longitude: number | null
    publicRemarks: string | null
    conditionSignal: string | null
    createdAt: Date
    updatedAt: Date
    _count: SoldListingCountAggregateOutputType | null
    _avg: SoldListingAvgAggregateOutputType | null
    _sum: SoldListingSumAggregateOutputType | null
    _min: SoldListingMinAggregateOutputType | null
    _max: SoldListingMaxAggregateOutputType | null
  }

  type GetSoldListingGroupByPayload<T extends SoldListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SoldListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SoldListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SoldListingGroupByOutputType[P]>
            : GetScalarType<T[P], SoldListingGroupByOutputType[P]>
        }
      >
    >


  export type SoldListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mlsId?: boolean
    address?: boolean
    city?: boolean
    zip?: boolean
    beds?: boolean
    baths?: boolean
    sqft?: boolean
    lotSize?: boolean
    yearBuilt?: boolean
    garageSpaces?: boolean
    closePrice?: boolean
    listPrice?: boolean
    closeDate?: boolean
    daysOnMarket?: boolean
    subdivision?: boolean
    latitude?: boolean
    longitude?: boolean
    publicRemarks?: boolean
    conditionSignal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldListing"]>

  export type SoldListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mlsId?: boolean
    address?: boolean
    city?: boolean
    zip?: boolean
    beds?: boolean
    baths?: boolean
    sqft?: boolean
    lotSize?: boolean
    yearBuilt?: boolean
    garageSpaces?: boolean
    closePrice?: boolean
    listPrice?: boolean
    closeDate?: boolean
    daysOnMarket?: boolean
    subdivision?: boolean
    latitude?: boolean
    longitude?: boolean
    publicRemarks?: boolean
    conditionSignal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldListing"]>

  export type SoldListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mlsId?: boolean
    address?: boolean
    city?: boolean
    zip?: boolean
    beds?: boolean
    baths?: boolean
    sqft?: boolean
    lotSize?: boolean
    yearBuilt?: boolean
    garageSpaces?: boolean
    closePrice?: boolean
    listPrice?: boolean
    closeDate?: boolean
    daysOnMarket?: boolean
    subdivision?: boolean
    latitude?: boolean
    longitude?: boolean
    publicRemarks?: boolean
    conditionSignal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["soldListing"]>

  export type SoldListingSelectScalar = {
    id?: boolean
    mlsId?: boolean
    address?: boolean
    city?: boolean
    zip?: boolean
    beds?: boolean
    baths?: boolean
    sqft?: boolean
    lotSize?: boolean
    yearBuilt?: boolean
    garageSpaces?: boolean
    closePrice?: boolean
    listPrice?: boolean
    closeDate?: boolean
    daysOnMarket?: boolean
    subdivision?: boolean
    latitude?: boolean
    longitude?: boolean
    publicRemarks?: boolean
    conditionSignal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SoldListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mlsId" | "address" | "city" | "zip" | "beds" | "baths" | "sqft" | "lotSize" | "yearBuilt" | "garageSpaces" | "closePrice" | "listPrice" | "closeDate" | "daysOnMarket" | "subdivision" | "latitude" | "longitude" | "publicRemarks" | "conditionSignal" | "createdAt" | "updatedAt", ExtArgs["result"]["soldListing"]>

  export type $SoldListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SoldListing"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mlsId: string
      address: string
      city: string | null
      zip: string | null
      beds: number | null
      baths: number | null
      sqft: number | null
      lotSize: number | null
      yearBuilt: number | null
      garageSpaces: number | null
      closePrice: number | null
      listPrice: number | null
      closeDate: string | null
      daysOnMarket: number | null
      subdivision: string | null
      latitude: number | null
      longitude: number | null
      publicRemarks: string | null
      conditionSignal: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["soldListing"]>
    composites: {}
  }

  type SoldListingGetPayload<S extends boolean | null | undefined | SoldListingDefaultArgs> = $Result.GetResult<Prisma.$SoldListingPayload, S>

  type SoldListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SoldListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SoldListingCountAggregateInputType | true
    }

  export interface SoldListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SoldListing'], meta: { name: 'SoldListing' } }
    /**
     * Find zero or one SoldListing that matches the filter.
     * @param {SoldListingFindUniqueArgs} args - Arguments to find a SoldListing
     * @example
     * // Get one SoldListing
     * const soldListing = await prisma.soldListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SoldListingFindUniqueArgs>(args: SelectSubset<T, SoldListingFindUniqueArgs<ExtArgs>>): Prisma__SoldListingClient<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SoldListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SoldListingFindUniqueOrThrowArgs} args - Arguments to find a SoldListing
     * @example
     * // Get one SoldListing
     * const soldListing = await prisma.soldListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SoldListingFindUniqueOrThrowArgs>(args: SelectSubset<T, SoldListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SoldListingClient<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoldListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoldListingFindFirstArgs} args - Arguments to find a SoldListing
     * @example
     * // Get one SoldListing
     * const soldListing = await prisma.soldListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SoldListingFindFirstArgs>(args?: SelectSubset<T, SoldListingFindFirstArgs<ExtArgs>>): Prisma__SoldListingClient<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SoldListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoldListingFindFirstOrThrowArgs} args - Arguments to find a SoldListing
     * @example
     * // Get one SoldListing
     * const soldListing = await prisma.soldListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SoldListingFindFirstOrThrowArgs>(args?: SelectSubset<T, SoldListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SoldListingClient<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SoldListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoldListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SoldListings
     * const soldListings = await prisma.soldListing.findMany()
     * 
     * // Get first 10 SoldListings
     * const soldListings = await prisma.soldListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const soldListingWithIdOnly = await prisma.soldListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SoldListingFindManyArgs>(args?: SelectSubset<T, SoldListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SoldListing.
     * @param {SoldListingCreateArgs} args - Arguments to create a SoldListing.
     * @example
     * // Create one SoldListing
     * const SoldListing = await prisma.soldListing.create({
     *   data: {
     *     // ... data to create a SoldListing
     *   }
     * })
     * 
     */
    create<T extends SoldListingCreateArgs>(args: SelectSubset<T, SoldListingCreateArgs<ExtArgs>>): Prisma__SoldListingClient<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SoldListings.
     * @param {SoldListingCreateManyArgs} args - Arguments to create many SoldListings.
     * @example
     * // Create many SoldListings
     * const soldListing = await prisma.soldListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SoldListingCreateManyArgs>(args?: SelectSubset<T, SoldListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SoldListings and returns the data saved in the database.
     * @param {SoldListingCreateManyAndReturnArgs} args - Arguments to create many SoldListings.
     * @example
     * // Create many SoldListings
     * const soldListing = await prisma.soldListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SoldListings and only return the `id`
     * const soldListingWithIdOnly = await prisma.soldListing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SoldListingCreateManyAndReturnArgs>(args?: SelectSubset<T, SoldListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SoldListing.
     * @param {SoldListingDeleteArgs} args - Arguments to delete one SoldListing.
     * @example
     * // Delete one SoldListing
     * const SoldListing = await prisma.soldListing.delete({
     *   where: {
     *     // ... filter to delete one SoldListing
     *   }
     * })
     * 
     */
    delete<T extends SoldListingDeleteArgs>(args: SelectSubset<T, SoldListingDeleteArgs<ExtArgs>>): Prisma__SoldListingClient<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SoldListing.
     * @param {SoldListingUpdateArgs} args - Arguments to update one SoldListing.
     * @example
     * // Update one SoldListing
     * const soldListing = await prisma.soldListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SoldListingUpdateArgs>(args: SelectSubset<T, SoldListingUpdateArgs<ExtArgs>>): Prisma__SoldListingClient<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SoldListings.
     * @param {SoldListingDeleteManyArgs} args - Arguments to filter SoldListings to delete.
     * @example
     * // Delete a few SoldListings
     * const { count } = await prisma.soldListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SoldListingDeleteManyArgs>(args?: SelectSubset<T, SoldListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoldListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoldListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SoldListings
     * const soldListing = await prisma.soldListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SoldListingUpdateManyArgs>(args: SelectSubset<T, SoldListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SoldListings and returns the data updated in the database.
     * @param {SoldListingUpdateManyAndReturnArgs} args - Arguments to update many SoldListings.
     * @example
     * // Update many SoldListings
     * const soldListing = await prisma.soldListing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SoldListings and only return the `id`
     * const soldListingWithIdOnly = await prisma.soldListing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SoldListingUpdateManyAndReturnArgs>(args: SelectSubset<T, SoldListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SoldListing.
     * @param {SoldListingUpsertArgs} args - Arguments to update or create a SoldListing.
     * @example
     * // Update or create a SoldListing
     * const soldListing = await prisma.soldListing.upsert({
     *   create: {
     *     // ... data to create a SoldListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SoldListing we want to update
     *   }
     * })
     */
    upsert<T extends SoldListingUpsertArgs>(args: SelectSubset<T, SoldListingUpsertArgs<ExtArgs>>): Prisma__SoldListingClient<$Result.GetResult<Prisma.$SoldListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SoldListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoldListingCountArgs} args - Arguments to filter SoldListings to count.
     * @example
     * // Count the number of SoldListings
     * const count = await prisma.soldListing.count({
     *   where: {
     *     // ... the filter for the SoldListings we want to count
     *   }
     * })
    **/
    count<T extends SoldListingCountArgs>(
      args?: Subset<T, SoldListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SoldListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SoldListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoldListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SoldListingAggregateArgs>(args: Subset<T, SoldListingAggregateArgs>): Prisma.PrismaPromise<GetSoldListingAggregateType<T>>

    /**
     * Group by SoldListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SoldListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SoldListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SoldListingGroupByArgs['orderBy'] }
        : { orderBy?: SoldListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SoldListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoldListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SoldListing model
   */
  readonly fields: SoldListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SoldListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SoldListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SoldListing model
   */
  interface SoldListingFieldRefs {
    readonly id: FieldRef<"SoldListing", 'Int'>
    readonly mlsId: FieldRef<"SoldListing", 'String'>
    readonly address: FieldRef<"SoldListing", 'String'>
    readonly city: FieldRef<"SoldListing", 'String'>
    readonly zip: FieldRef<"SoldListing", 'String'>
    readonly beds: FieldRef<"SoldListing", 'Float'>
    readonly baths: FieldRef<"SoldListing", 'Float'>
    readonly sqft: FieldRef<"SoldListing", 'Float'>
    readonly lotSize: FieldRef<"SoldListing", 'Float'>
    readonly yearBuilt: FieldRef<"SoldListing", 'Int'>
    readonly garageSpaces: FieldRef<"SoldListing", 'Int'>
    readonly closePrice: FieldRef<"SoldListing", 'Float'>
    readonly listPrice: FieldRef<"SoldListing", 'Float'>
    readonly closeDate: FieldRef<"SoldListing", 'String'>
    readonly daysOnMarket: FieldRef<"SoldListing", 'Int'>
    readonly subdivision: FieldRef<"SoldListing", 'String'>
    readonly latitude: FieldRef<"SoldListing", 'Float'>
    readonly longitude: FieldRef<"SoldListing", 'Float'>
    readonly publicRemarks: FieldRef<"SoldListing", 'String'>
    readonly conditionSignal: FieldRef<"SoldListing", 'String'>
    readonly createdAt: FieldRef<"SoldListing", 'DateTime'>
    readonly updatedAt: FieldRef<"SoldListing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SoldListing findUnique
   */
  export type SoldListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * Filter, which SoldListing to fetch.
     */
    where: SoldListingWhereUniqueInput
  }

  /**
   * SoldListing findUniqueOrThrow
   */
  export type SoldListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * Filter, which SoldListing to fetch.
     */
    where: SoldListingWhereUniqueInput
  }

  /**
   * SoldListing findFirst
   */
  export type SoldListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * Filter, which SoldListing to fetch.
     */
    where?: SoldListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoldListings to fetch.
     */
    orderBy?: SoldListingOrderByWithRelationInput | SoldListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoldListings.
     */
    cursor?: SoldListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoldListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoldListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoldListings.
     */
    distinct?: SoldListingScalarFieldEnum | SoldListingScalarFieldEnum[]
  }

  /**
   * SoldListing findFirstOrThrow
   */
  export type SoldListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * Filter, which SoldListing to fetch.
     */
    where?: SoldListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoldListings to fetch.
     */
    orderBy?: SoldListingOrderByWithRelationInput | SoldListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SoldListings.
     */
    cursor?: SoldListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoldListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoldListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoldListings.
     */
    distinct?: SoldListingScalarFieldEnum | SoldListingScalarFieldEnum[]
  }

  /**
   * SoldListing findMany
   */
  export type SoldListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * Filter, which SoldListings to fetch.
     */
    where?: SoldListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SoldListings to fetch.
     */
    orderBy?: SoldListingOrderByWithRelationInput | SoldListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SoldListings.
     */
    cursor?: SoldListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SoldListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SoldListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SoldListings.
     */
    distinct?: SoldListingScalarFieldEnum | SoldListingScalarFieldEnum[]
  }

  /**
   * SoldListing create
   */
  export type SoldListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * The data needed to create a SoldListing.
     */
    data: XOR<SoldListingCreateInput, SoldListingUncheckedCreateInput>
  }

  /**
   * SoldListing createMany
   */
  export type SoldListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SoldListings.
     */
    data: SoldListingCreateManyInput | SoldListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SoldListing createManyAndReturn
   */
  export type SoldListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * The data used to create many SoldListings.
     */
    data: SoldListingCreateManyInput | SoldListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SoldListing update
   */
  export type SoldListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * The data needed to update a SoldListing.
     */
    data: XOR<SoldListingUpdateInput, SoldListingUncheckedUpdateInput>
    /**
     * Choose, which SoldListing to update.
     */
    where: SoldListingWhereUniqueInput
  }

  /**
   * SoldListing updateMany
   */
  export type SoldListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SoldListings.
     */
    data: XOR<SoldListingUpdateManyMutationInput, SoldListingUncheckedUpdateManyInput>
    /**
     * Filter which SoldListings to update
     */
    where?: SoldListingWhereInput
    /**
     * Limit how many SoldListings to update.
     */
    limit?: number
  }

  /**
   * SoldListing updateManyAndReturn
   */
  export type SoldListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * The data used to update SoldListings.
     */
    data: XOR<SoldListingUpdateManyMutationInput, SoldListingUncheckedUpdateManyInput>
    /**
     * Filter which SoldListings to update
     */
    where?: SoldListingWhereInput
    /**
     * Limit how many SoldListings to update.
     */
    limit?: number
  }

  /**
   * SoldListing upsert
   */
  export type SoldListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * The filter to search for the SoldListing to update in case it exists.
     */
    where: SoldListingWhereUniqueInput
    /**
     * In case the SoldListing found by the `where` argument doesn't exist, create a new SoldListing with this data.
     */
    create: XOR<SoldListingCreateInput, SoldListingUncheckedCreateInput>
    /**
     * In case the SoldListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SoldListingUpdateInput, SoldListingUncheckedUpdateInput>
  }

  /**
   * SoldListing delete
   */
  export type SoldListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
    /**
     * Filter which SoldListing to delete.
     */
    where: SoldListingWhereUniqueInput
  }

  /**
   * SoldListing deleteMany
   */
  export type SoldListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SoldListings to delete
     */
    where?: SoldListingWhereInput
    /**
     * Limit how many SoldListings to delete.
     */
    limit?: number
  }

  /**
   * SoldListing without action
   */
  export type SoldListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SoldListing
     */
    select?: SoldListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SoldListing
     */
    omit?: SoldListingOmit<ExtArgs> | null
  }


  /**
   * Model SyncLog
   */

  export type AggregateSyncLog = {
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  export type SyncLogAvgAggregateOutputType = {
    id: number | null
    recordsProcessed: number | null
  }

  export type SyncLogSumAggregateOutputType = {
    id: number | null
    recordsProcessed: number | null
  }

  export type SyncLogMinAggregateOutputType = {
    id: number | null
    type: string | null
    startedAt: Date | null
    completedAt: Date | null
    recordsProcessed: number | null
    status: string | null
    error: string | null
    rangeStart: string | null
    rangeEnd: string | null
  }

  export type SyncLogMaxAggregateOutputType = {
    id: number | null
    type: string | null
    startedAt: Date | null
    completedAt: Date | null
    recordsProcessed: number | null
    status: string | null
    error: string | null
    rangeStart: string | null
    rangeEnd: string | null
  }

  export type SyncLogCountAggregateOutputType = {
    id: number
    type: number
    startedAt: number
    completedAt: number
    recordsProcessed: number
    status: number
    error: number
    rangeStart: number
    rangeEnd: number
    _all: number
  }


  export type SyncLogAvgAggregateInputType = {
    id?: true
    recordsProcessed?: true
  }

  export type SyncLogSumAggregateInputType = {
    id?: true
    recordsProcessed?: true
  }

  export type SyncLogMinAggregateInputType = {
    id?: true
    type?: true
    startedAt?: true
    completedAt?: true
    recordsProcessed?: true
    status?: true
    error?: true
    rangeStart?: true
    rangeEnd?: true
  }

  export type SyncLogMaxAggregateInputType = {
    id?: true
    type?: true
    startedAt?: true
    completedAt?: true
    recordsProcessed?: true
    status?: true
    error?: true
    rangeStart?: true
    rangeEnd?: true
  }

  export type SyncLogCountAggregateInputType = {
    id?: true
    type?: true
    startedAt?: true
    completedAt?: true
    recordsProcessed?: true
    status?: true
    error?: true
    rangeStart?: true
    rangeEnd?: true
    _all?: true
  }

  export type SyncLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLog to aggregate.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SyncLogs
    **/
    _count?: true | SyncLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SyncLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SyncLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SyncLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SyncLogMaxAggregateInputType
  }

  export type GetSyncLogAggregateType<T extends SyncLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSyncLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSyncLog[P]>
      : GetScalarType<T[P], AggregateSyncLog[P]>
  }




  export type SyncLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SyncLogWhereInput
    orderBy?: SyncLogOrderByWithAggregationInput | SyncLogOrderByWithAggregationInput[]
    by: SyncLogScalarFieldEnum[] | SyncLogScalarFieldEnum
    having?: SyncLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SyncLogCountAggregateInputType | true
    _avg?: SyncLogAvgAggregateInputType
    _sum?: SyncLogSumAggregateInputType
    _min?: SyncLogMinAggregateInputType
    _max?: SyncLogMaxAggregateInputType
  }

  export type SyncLogGroupByOutputType = {
    id: number
    type: string
    startedAt: Date
    completedAt: Date | null
    recordsProcessed: number
    status: string
    error: string | null
    rangeStart: string | null
    rangeEnd: string | null
    _count: SyncLogCountAggregateOutputType | null
    _avg: SyncLogAvgAggregateOutputType | null
    _sum: SyncLogSumAggregateOutputType | null
    _min: SyncLogMinAggregateOutputType | null
    _max: SyncLogMaxAggregateOutputType | null
  }

  type GetSyncLogGroupByPayload<T extends SyncLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SyncLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SyncLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
            : GetScalarType<T[P], SyncLogGroupByOutputType[P]>
        }
      >
    >


  export type SyncLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    startedAt?: boolean
    completedAt?: boolean
    recordsProcessed?: boolean
    status?: boolean
    error?: boolean
    rangeStart?: boolean
    rangeEnd?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    startedAt?: boolean
    completedAt?: boolean
    recordsProcessed?: boolean
    status?: boolean
    error?: boolean
    rangeStart?: boolean
    rangeEnd?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    startedAt?: boolean
    completedAt?: boolean
    recordsProcessed?: boolean
    status?: boolean
    error?: boolean
    rangeStart?: boolean
    rangeEnd?: boolean
  }, ExtArgs["result"]["syncLog"]>

  export type SyncLogSelectScalar = {
    id?: boolean
    type?: boolean
    startedAt?: boolean
    completedAt?: boolean
    recordsProcessed?: boolean
    status?: boolean
    error?: boolean
    rangeStart?: boolean
    rangeEnd?: boolean
  }

  export type SyncLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "startedAt" | "completedAt" | "recordsProcessed" | "status" | "error" | "rangeStart" | "rangeEnd", ExtArgs["result"]["syncLog"]>

  export type $SyncLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SyncLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string
      startedAt: Date
      completedAt: Date | null
      recordsProcessed: number
      status: string
      error: string | null
      rangeStart: string | null
      rangeEnd: string | null
    }, ExtArgs["result"]["syncLog"]>
    composites: {}
  }

  type SyncLogGetPayload<S extends boolean | null | undefined | SyncLogDefaultArgs> = $Result.GetResult<Prisma.$SyncLogPayload, S>

  type SyncLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SyncLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SyncLogCountAggregateInputType | true
    }

  export interface SyncLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SyncLog'], meta: { name: 'SyncLog' } }
    /**
     * Find zero or one SyncLog that matches the filter.
     * @param {SyncLogFindUniqueArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SyncLogFindUniqueArgs>(args: SelectSubset<T, SyncLogFindUniqueArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SyncLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SyncLogFindUniqueOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SyncLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SyncLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SyncLogFindFirstArgs>(args?: SelectSubset<T, SyncLogFindFirstArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SyncLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindFirstOrThrowArgs} args - Arguments to find a SyncLog
     * @example
     * // Get one SyncLog
     * const syncLog = await prisma.syncLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SyncLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SyncLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SyncLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SyncLogs
     * const syncLogs = await prisma.syncLog.findMany()
     * 
     * // Get first 10 SyncLogs
     * const syncLogs = await prisma.syncLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SyncLogFindManyArgs>(args?: SelectSubset<T, SyncLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SyncLog.
     * @param {SyncLogCreateArgs} args - Arguments to create a SyncLog.
     * @example
     * // Create one SyncLog
     * const SyncLog = await prisma.syncLog.create({
     *   data: {
     *     // ... data to create a SyncLog
     *   }
     * })
     * 
     */
    create<T extends SyncLogCreateArgs>(args: SelectSubset<T, SyncLogCreateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SyncLogs.
     * @param {SyncLogCreateManyArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SyncLogCreateManyArgs>(args?: SelectSubset<T, SyncLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SyncLogs and returns the data saved in the database.
     * @param {SyncLogCreateManyAndReturnArgs} args - Arguments to create many SyncLogs.
     * @example
     * // Create many SyncLogs
     * const syncLog = await prisma.syncLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SyncLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SyncLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SyncLog.
     * @param {SyncLogDeleteArgs} args - Arguments to delete one SyncLog.
     * @example
     * // Delete one SyncLog
     * const SyncLog = await prisma.syncLog.delete({
     *   where: {
     *     // ... filter to delete one SyncLog
     *   }
     * })
     * 
     */
    delete<T extends SyncLogDeleteArgs>(args: SelectSubset<T, SyncLogDeleteArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SyncLog.
     * @param {SyncLogUpdateArgs} args - Arguments to update one SyncLog.
     * @example
     * // Update one SyncLog
     * const syncLog = await prisma.syncLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SyncLogUpdateArgs>(args: SelectSubset<T, SyncLogUpdateArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SyncLogs.
     * @param {SyncLogDeleteManyArgs} args - Arguments to filter SyncLogs to delete.
     * @example
     * // Delete a few SyncLogs
     * const { count } = await prisma.syncLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SyncLogDeleteManyArgs>(args?: SelectSubset<T, SyncLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SyncLogUpdateManyArgs>(args: SelectSubset<T, SyncLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SyncLogs and returns the data updated in the database.
     * @param {SyncLogUpdateManyAndReturnArgs} args - Arguments to update many SyncLogs.
     * @example
     * // Update many SyncLogs
     * const syncLog = await prisma.syncLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SyncLogs and only return the `id`
     * const syncLogWithIdOnly = await prisma.syncLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SyncLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SyncLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SyncLog.
     * @param {SyncLogUpsertArgs} args - Arguments to update or create a SyncLog.
     * @example
     * // Update or create a SyncLog
     * const syncLog = await prisma.syncLog.upsert({
     *   create: {
     *     // ... data to create a SyncLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SyncLog we want to update
     *   }
     * })
     */
    upsert<T extends SyncLogUpsertArgs>(args: SelectSubset<T, SyncLogUpsertArgs<ExtArgs>>): Prisma__SyncLogClient<$Result.GetResult<Prisma.$SyncLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SyncLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogCountArgs} args - Arguments to filter SyncLogs to count.
     * @example
     * // Count the number of SyncLogs
     * const count = await prisma.syncLog.count({
     *   where: {
     *     // ... the filter for the SyncLogs we want to count
     *   }
     * })
    **/
    count<T extends SyncLogCountArgs>(
      args?: Subset<T, SyncLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SyncLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SyncLogAggregateArgs>(args: Subset<T, SyncLogAggregateArgs>): Prisma.PrismaPromise<GetSyncLogAggregateType<T>>

    /**
     * Group by SyncLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SyncLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SyncLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SyncLogGroupByArgs['orderBy'] }
        : { orderBy?: SyncLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SyncLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSyncLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SyncLog model
   */
  readonly fields: SyncLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SyncLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SyncLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SyncLog model
   */
  interface SyncLogFieldRefs {
    readonly id: FieldRef<"SyncLog", 'Int'>
    readonly type: FieldRef<"SyncLog", 'String'>
    readonly startedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly completedAt: FieldRef<"SyncLog", 'DateTime'>
    readonly recordsProcessed: FieldRef<"SyncLog", 'Int'>
    readonly status: FieldRef<"SyncLog", 'String'>
    readonly error: FieldRef<"SyncLog", 'String'>
    readonly rangeStart: FieldRef<"SyncLog", 'String'>
    readonly rangeEnd: FieldRef<"SyncLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SyncLog findUnique
   */
  export type SyncLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findUniqueOrThrow
   */
  export type SyncLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog findFirst
   */
  export type SyncLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findFirstOrThrow
   */
  export type SyncLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLog to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog findMany
   */
  export type SyncLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter, which SyncLogs to fetch.
     */
    where?: SyncLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SyncLogs to fetch.
     */
    orderBy?: SyncLogOrderByWithRelationInput | SyncLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SyncLogs.
     */
    cursor?: SyncLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SyncLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SyncLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SyncLogs.
     */
    distinct?: SyncLogScalarFieldEnum | SyncLogScalarFieldEnum[]
  }

  /**
   * SyncLog create
   */
  export type SyncLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SyncLog.
     */
    data: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
  }

  /**
   * SyncLog createMany
   */
  export type SyncLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog createManyAndReturn
   */
  export type SyncLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to create many SyncLogs.
     */
    data: SyncLogCreateManyInput | SyncLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SyncLog update
   */
  export type SyncLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SyncLog.
     */
    data: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
    /**
     * Choose, which SyncLog to update.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog updateMany
   */
  export type SyncLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog updateManyAndReturn
   */
  export type SyncLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The data used to update SyncLogs.
     */
    data: XOR<SyncLogUpdateManyMutationInput, SyncLogUncheckedUpdateManyInput>
    /**
     * Filter which SyncLogs to update
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to update.
     */
    limit?: number
  }

  /**
   * SyncLog upsert
   */
  export type SyncLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SyncLog to update in case it exists.
     */
    where: SyncLogWhereUniqueInput
    /**
     * In case the SyncLog found by the `where` argument doesn't exist, create a new SyncLog with this data.
     */
    create: XOR<SyncLogCreateInput, SyncLogUncheckedCreateInput>
    /**
     * In case the SyncLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SyncLogUpdateInput, SyncLogUncheckedUpdateInput>
  }

  /**
   * SyncLog delete
   */
  export type SyncLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
    /**
     * Filter which SyncLog to delete.
     */
    where: SyncLogWhereUniqueInput
  }

  /**
   * SyncLog deleteMany
   */
  export type SyncLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SyncLogs to delete
     */
    where?: SyncLogWhereInput
    /**
     * Limit how many SyncLogs to delete.
     */
    limit?: number
  }

  /**
   * SyncLog without action
   */
  export type SyncLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SyncLog
     */
    select?: SyncLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SyncLog
     */
    omit?: SyncLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SoldListingScalarFieldEnum: {
    id: 'id',
    mlsId: 'mlsId',
    address: 'address',
    city: 'city',
    zip: 'zip',
    beds: 'beds',
    baths: 'baths',
    sqft: 'sqft',
    lotSize: 'lotSize',
    yearBuilt: 'yearBuilt',
    garageSpaces: 'garageSpaces',
    closePrice: 'closePrice',
    listPrice: 'listPrice',
    closeDate: 'closeDate',
    daysOnMarket: 'daysOnMarket',
    subdivision: 'subdivision',
    latitude: 'latitude',
    longitude: 'longitude',
    publicRemarks: 'publicRemarks',
    conditionSignal: 'conditionSignal',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SoldListingScalarFieldEnum = (typeof SoldListingScalarFieldEnum)[keyof typeof SoldListingScalarFieldEnum]


  export const SyncLogScalarFieldEnum: {
    id: 'id',
    type: 'type',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    recordsProcessed: 'recordsProcessed',
    status: 'status',
    error: 'error',
    rangeStart: 'rangeStart',
    rangeEnd: 'rangeEnd'
  };

  export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type SoldListingWhereInput = {
    AND?: SoldListingWhereInput | SoldListingWhereInput[]
    OR?: SoldListingWhereInput[]
    NOT?: SoldListingWhereInput | SoldListingWhereInput[]
    id?: IntFilter<"SoldListing"> | number
    mlsId?: StringFilter<"SoldListing"> | string
    address?: StringFilter<"SoldListing"> | string
    city?: StringNullableFilter<"SoldListing"> | string | null
    zip?: StringNullableFilter<"SoldListing"> | string | null
    beds?: FloatNullableFilter<"SoldListing"> | number | null
    baths?: FloatNullableFilter<"SoldListing"> | number | null
    sqft?: FloatNullableFilter<"SoldListing"> | number | null
    lotSize?: FloatNullableFilter<"SoldListing"> | number | null
    yearBuilt?: IntNullableFilter<"SoldListing"> | number | null
    garageSpaces?: IntNullableFilter<"SoldListing"> | number | null
    closePrice?: FloatNullableFilter<"SoldListing"> | number | null
    listPrice?: FloatNullableFilter<"SoldListing"> | number | null
    closeDate?: StringNullableFilter<"SoldListing"> | string | null
    daysOnMarket?: IntNullableFilter<"SoldListing"> | number | null
    subdivision?: StringNullableFilter<"SoldListing"> | string | null
    latitude?: FloatNullableFilter<"SoldListing"> | number | null
    longitude?: FloatNullableFilter<"SoldListing"> | number | null
    publicRemarks?: StringNullableFilter<"SoldListing"> | string | null
    conditionSignal?: StringNullableFilter<"SoldListing"> | string | null
    createdAt?: DateTimeFilter<"SoldListing"> | Date | string
    updatedAt?: DateTimeFilter<"SoldListing"> | Date | string
  }

  export type SoldListingOrderByWithRelationInput = {
    id?: SortOrder
    mlsId?: SortOrder
    address?: SortOrder
    city?: SortOrderInput | SortOrder
    zip?: SortOrderInput | SortOrder
    beds?: SortOrderInput | SortOrder
    baths?: SortOrderInput | SortOrder
    sqft?: SortOrderInput | SortOrder
    lotSize?: SortOrderInput | SortOrder
    yearBuilt?: SortOrderInput | SortOrder
    garageSpaces?: SortOrderInput | SortOrder
    closePrice?: SortOrderInput | SortOrder
    listPrice?: SortOrderInput | SortOrder
    closeDate?: SortOrderInput | SortOrder
    daysOnMarket?: SortOrderInput | SortOrder
    subdivision?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    publicRemarks?: SortOrderInput | SortOrder
    conditionSignal?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoldListingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    mlsId?: string
    AND?: SoldListingWhereInput | SoldListingWhereInput[]
    OR?: SoldListingWhereInput[]
    NOT?: SoldListingWhereInput | SoldListingWhereInput[]
    address?: StringFilter<"SoldListing"> | string
    city?: StringNullableFilter<"SoldListing"> | string | null
    zip?: StringNullableFilter<"SoldListing"> | string | null
    beds?: FloatNullableFilter<"SoldListing"> | number | null
    baths?: FloatNullableFilter<"SoldListing"> | number | null
    sqft?: FloatNullableFilter<"SoldListing"> | number | null
    lotSize?: FloatNullableFilter<"SoldListing"> | number | null
    yearBuilt?: IntNullableFilter<"SoldListing"> | number | null
    garageSpaces?: IntNullableFilter<"SoldListing"> | number | null
    closePrice?: FloatNullableFilter<"SoldListing"> | number | null
    listPrice?: FloatNullableFilter<"SoldListing"> | number | null
    closeDate?: StringNullableFilter<"SoldListing"> | string | null
    daysOnMarket?: IntNullableFilter<"SoldListing"> | number | null
    subdivision?: StringNullableFilter<"SoldListing"> | string | null
    latitude?: FloatNullableFilter<"SoldListing"> | number | null
    longitude?: FloatNullableFilter<"SoldListing"> | number | null
    publicRemarks?: StringNullableFilter<"SoldListing"> | string | null
    conditionSignal?: StringNullableFilter<"SoldListing"> | string | null
    createdAt?: DateTimeFilter<"SoldListing"> | Date | string
    updatedAt?: DateTimeFilter<"SoldListing"> | Date | string
  }, "id" | "mlsId">

  export type SoldListingOrderByWithAggregationInput = {
    id?: SortOrder
    mlsId?: SortOrder
    address?: SortOrder
    city?: SortOrderInput | SortOrder
    zip?: SortOrderInput | SortOrder
    beds?: SortOrderInput | SortOrder
    baths?: SortOrderInput | SortOrder
    sqft?: SortOrderInput | SortOrder
    lotSize?: SortOrderInput | SortOrder
    yearBuilt?: SortOrderInput | SortOrder
    garageSpaces?: SortOrderInput | SortOrder
    closePrice?: SortOrderInput | SortOrder
    listPrice?: SortOrderInput | SortOrder
    closeDate?: SortOrderInput | SortOrder
    daysOnMarket?: SortOrderInput | SortOrder
    subdivision?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    publicRemarks?: SortOrderInput | SortOrder
    conditionSignal?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SoldListingCountOrderByAggregateInput
    _avg?: SoldListingAvgOrderByAggregateInput
    _max?: SoldListingMaxOrderByAggregateInput
    _min?: SoldListingMinOrderByAggregateInput
    _sum?: SoldListingSumOrderByAggregateInput
  }

  export type SoldListingScalarWhereWithAggregatesInput = {
    AND?: SoldListingScalarWhereWithAggregatesInput | SoldListingScalarWhereWithAggregatesInput[]
    OR?: SoldListingScalarWhereWithAggregatesInput[]
    NOT?: SoldListingScalarWhereWithAggregatesInput | SoldListingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SoldListing"> | number
    mlsId?: StringWithAggregatesFilter<"SoldListing"> | string
    address?: StringWithAggregatesFilter<"SoldListing"> | string
    city?: StringNullableWithAggregatesFilter<"SoldListing"> | string | null
    zip?: StringNullableWithAggregatesFilter<"SoldListing"> | string | null
    beds?: FloatNullableWithAggregatesFilter<"SoldListing"> | number | null
    baths?: FloatNullableWithAggregatesFilter<"SoldListing"> | number | null
    sqft?: FloatNullableWithAggregatesFilter<"SoldListing"> | number | null
    lotSize?: FloatNullableWithAggregatesFilter<"SoldListing"> | number | null
    yearBuilt?: IntNullableWithAggregatesFilter<"SoldListing"> | number | null
    garageSpaces?: IntNullableWithAggregatesFilter<"SoldListing"> | number | null
    closePrice?: FloatNullableWithAggregatesFilter<"SoldListing"> | number | null
    listPrice?: FloatNullableWithAggregatesFilter<"SoldListing"> | number | null
    closeDate?: StringNullableWithAggregatesFilter<"SoldListing"> | string | null
    daysOnMarket?: IntNullableWithAggregatesFilter<"SoldListing"> | number | null
    subdivision?: StringNullableWithAggregatesFilter<"SoldListing"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"SoldListing"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"SoldListing"> | number | null
    publicRemarks?: StringNullableWithAggregatesFilter<"SoldListing"> | string | null
    conditionSignal?: StringNullableWithAggregatesFilter<"SoldListing"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SoldListing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SoldListing"> | Date | string
  }

  export type SyncLogWhereInput = {
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    id?: IntFilter<"SyncLog"> | number
    type?: StringFilter<"SyncLog"> | string
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
    recordsProcessed?: IntFilter<"SyncLog"> | number
    status?: StringFilter<"SyncLog"> | string
    error?: StringNullableFilter<"SyncLog"> | string | null
    rangeStart?: StringNullableFilter<"SyncLog"> | string | null
    rangeEnd?: StringNullableFilter<"SyncLog"> | string | null
  }

  export type SyncLogOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    rangeStart?: SortOrderInput | SortOrder
    rangeEnd?: SortOrderInput | SortOrder
  }

  export type SyncLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SyncLogWhereInput | SyncLogWhereInput[]
    OR?: SyncLogWhereInput[]
    NOT?: SyncLogWhereInput | SyncLogWhereInput[]
    type?: StringFilter<"SyncLog"> | string
    startedAt?: DateTimeFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableFilter<"SyncLog"> | Date | string | null
    recordsProcessed?: IntFilter<"SyncLog"> | number
    status?: StringFilter<"SyncLog"> | string
    error?: StringNullableFilter<"SyncLog"> | string | null
    rangeStart?: StringNullableFilter<"SyncLog"> | string | null
    rangeEnd?: StringNullableFilter<"SyncLog"> | string | null
  }, "id">

  export type SyncLogOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    rangeStart?: SortOrderInput | SortOrder
    rangeEnd?: SortOrderInput | SortOrder
    _count?: SyncLogCountOrderByAggregateInput
    _avg?: SyncLogAvgOrderByAggregateInput
    _max?: SyncLogMaxOrderByAggregateInput
    _min?: SyncLogMinOrderByAggregateInput
    _sum?: SyncLogSumOrderByAggregateInput
  }

  export type SyncLogScalarWhereWithAggregatesInput = {
    AND?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    OR?: SyncLogScalarWhereWithAggregatesInput[]
    NOT?: SyncLogScalarWhereWithAggregatesInput | SyncLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SyncLog"> | number
    type?: StringWithAggregatesFilter<"SyncLog"> | string
    startedAt?: DateTimeWithAggregatesFilter<"SyncLog"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"SyncLog"> | Date | string | null
    recordsProcessed?: IntWithAggregatesFilter<"SyncLog"> | number
    status?: StringWithAggregatesFilter<"SyncLog"> | string
    error?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    rangeStart?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
    rangeEnd?: StringNullableWithAggregatesFilter<"SyncLog"> | string | null
  }

  export type SoldListingCreateInput = {
    mlsId: string
    address: string
    city?: string | null
    zip?: string | null
    beds?: number | null
    baths?: number | null
    sqft?: number | null
    lotSize?: number | null
    yearBuilt?: number | null
    garageSpaces?: number | null
    closePrice?: number | null
    listPrice?: number | null
    closeDate?: string | null
    daysOnMarket?: number | null
    subdivision?: string | null
    latitude?: number | null
    longitude?: number | null
    publicRemarks?: string | null
    conditionSignal?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SoldListingUncheckedCreateInput = {
    id?: number
    mlsId: string
    address: string
    city?: string | null
    zip?: string | null
    beds?: number | null
    baths?: number | null
    sqft?: number | null
    lotSize?: number | null
    yearBuilt?: number | null
    garageSpaces?: number | null
    closePrice?: number | null
    listPrice?: number | null
    closeDate?: string | null
    daysOnMarket?: number | null
    subdivision?: string | null
    latitude?: number | null
    longitude?: number | null
    publicRemarks?: string | null
    conditionSignal?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SoldListingUpdateInput = {
    mlsId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    beds?: NullableFloatFieldUpdateOperationsInput | number | null
    baths?: NullableFloatFieldUpdateOperationsInput | number | null
    sqft?: NullableFloatFieldUpdateOperationsInput | number | null
    lotSize?: NullableFloatFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    garageSpaces?: NullableIntFieldUpdateOperationsInput | number | null
    closePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    listPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    closeDate?: NullableStringFieldUpdateOperationsInput | string | null
    daysOnMarket?: NullableIntFieldUpdateOperationsInput | number | null
    subdivision?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    publicRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSignal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoldListingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mlsId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    beds?: NullableFloatFieldUpdateOperationsInput | number | null
    baths?: NullableFloatFieldUpdateOperationsInput | number | null
    sqft?: NullableFloatFieldUpdateOperationsInput | number | null
    lotSize?: NullableFloatFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    garageSpaces?: NullableIntFieldUpdateOperationsInput | number | null
    closePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    listPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    closeDate?: NullableStringFieldUpdateOperationsInput | string | null
    daysOnMarket?: NullableIntFieldUpdateOperationsInput | number | null
    subdivision?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    publicRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSignal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoldListingCreateManyInput = {
    id?: number
    mlsId: string
    address: string
    city?: string | null
    zip?: string | null
    beds?: number | null
    baths?: number | null
    sqft?: number | null
    lotSize?: number | null
    yearBuilt?: number | null
    garageSpaces?: number | null
    closePrice?: number | null
    listPrice?: number | null
    closeDate?: string | null
    daysOnMarket?: number | null
    subdivision?: string | null
    latitude?: number | null
    longitude?: number | null
    publicRemarks?: string | null
    conditionSignal?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SoldListingUpdateManyMutationInput = {
    mlsId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    beds?: NullableFloatFieldUpdateOperationsInput | number | null
    baths?: NullableFloatFieldUpdateOperationsInput | number | null
    sqft?: NullableFloatFieldUpdateOperationsInput | number | null
    lotSize?: NullableFloatFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    garageSpaces?: NullableIntFieldUpdateOperationsInput | number | null
    closePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    listPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    closeDate?: NullableStringFieldUpdateOperationsInput | string | null
    daysOnMarket?: NullableIntFieldUpdateOperationsInput | number | null
    subdivision?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    publicRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSignal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SoldListingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mlsId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    zip?: NullableStringFieldUpdateOperationsInput | string | null
    beds?: NullableFloatFieldUpdateOperationsInput | number | null
    baths?: NullableFloatFieldUpdateOperationsInput | number | null
    sqft?: NullableFloatFieldUpdateOperationsInput | number | null
    lotSize?: NullableFloatFieldUpdateOperationsInput | number | null
    yearBuilt?: NullableIntFieldUpdateOperationsInput | number | null
    garageSpaces?: NullableIntFieldUpdateOperationsInput | number | null
    closePrice?: NullableFloatFieldUpdateOperationsInput | number | null
    listPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    closeDate?: NullableStringFieldUpdateOperationsInput | string | null
    daysOnMarket?: NullableIntFieldUpdateOperationsInput | number | null
    subdivision?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    publicRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    conditionSignal?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SyncLogCreateInput = {
    type: string
    startedAt?: Date | string
    completedAt?: Date | string | null
    recordsProcessed?: number
    status?: string
    error?: string | null
    rangeStart?: string | null
    rangeEnd?: string | null
  }

  export type SyncLogUncheckedCreateInput = {
    id?: number
    type: string
    startedAt?: Date | string
    completedAt?: Date | string | null
    recordsProcessed?: number
    status?: string
    error?: string | null
    rangeStart?: string | null
    rangeEnd?: string | null
  }

  export type SyncLogUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordsProcessed?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    rangeStart?: NullableStringFieldUpdateOperationsInput | string | null
    rangeEnd?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SyncLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordsProcessed?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    rangeStart?: NullableStringFieldUpdateOperationsInput | string | null
    rangeEnd?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SyncLogCreateManyInput = {
    id?: number
    type: string
    startedAt?: Date | string
    completedAt?: Date | string | null
    recordsProcessed?: number
    status?: string
    error?: string | null
    rangeStart?: string | null
    rangeEnd?: string | null
  }

  export type SyncLogUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordsProcessed?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    rangeStart?: NullableStringFieldUpdateOperationsInput | string | null
    rangeEnd?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SyncLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recordsProcessed?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    rangeStart?: NullableStringFieldUpdateOperationsInput | string | null
    rangeEnd?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SoldListingCountOrderByAggregateInput = {
    id?: SortOrder
    mlsId?: SortOrder
    address?: SortOrder
    city?: SortOrder
    zip?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    sqft?: SortOrder
    lotSize?: SortOrder
    yearBuilt?: SortOrder
    garageSpaces?: SortOrder
    closePrice?: SortOrder
    listPrice?: SortOrder
    closeDate?: SortOrder
    daysOnMarket?: SortOrder
    subdivision?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    publicRemarks?: SortOrder
    conditionSignal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoldListingAvgOrderByAggregateInput = {
    id?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    sqft?: SortOrder
    lotSize?: SortOrder
    yearBuilt?: SortOrder
    garageSpaces?: SortOrder
    closePrice?: SortOrder
    listPrice?: SortOrder
    daysOnMarket?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type SoldListingMaxOrderByAggregateInput = {
    id?: SortOrder
    mlsId?: SortOrder
    address?: SortOrder
    city?: SortOrder
    zip?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    sqft?: SortOrder
    lotSize?: SortOrder
    yearBuilt?: SortOrder
    garageSpaces?: SortOrder
    closePrice?: SortOrder
    listPrice?: SortOrder
    closeDate?: SortOrder
    daysOnMarket?: SortOrder
    subdivision?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    publicRemarks?: SortOrder
    conditionSignal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoldListingMinOrderByAggregateInput = {
    id?: SortOrder
    mlsId?: SortOrder
    address?: SortOrder
    city?: SortOrder
    zip?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    sqft?: SortOrder
    lotSize?: SortOrder
    yearBuilt?: SortOrder
    garageSpaces?: SortOrder
    closePrice?: SortOrder
    listPrice?: SortOrder
    closeDate?: SortOrder
    daysOnMarket?: SortOrder
    subdivision?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    publicRemarks?: SortOrder
    conditionSignal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SoldListingSumOrderByAggregateInput = {
    id?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    sqft?: SortOrder
    lotSize?: SortOrder
    yearBuilt?: SortOrder
    garageSpaces?: SortOrder
    closePrice?: SortOrder
    listPrice?: SortOrder
    daysOnMarket?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SyncLogCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
    error?: SortOrder
    rangeStart?: SortOrder
    rangeEnd?: SortOrder
  }

  export type SyncLogAvgOrderByAggregateInput = {
    id?: SortOrder
    recordsProcessed?: SortOrder
  }

  export type SyncLogMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
    error?: SortOrder
    rangeStart?: SortOrder
    rangeEnd?: SortOrder
  }

  export type SyncLogMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    recordsProcessed?: SortOrder
    status?: SortOrder
    error?: SortOrder
    rangeStart?: SortOrder
    rangeEnd?: SortOrder
  }

  export type SyncLogSumOrderByAggregateInput = {
    id?: SortOrder
    recordsProcessed?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}