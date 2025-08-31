
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserAddress
 * 
 */
export type UserAddress = $Result.DefaultSelection<Prisma.$UserAddressPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model UserInterest
 * 
 */
export type UserInterest = $Result.DefaultSelection<Prisma.$UserInterestPayload>
/**
 * Model VerificationDocument
 * 
 */
export type VerificationDocument = $Result.DefaultSelection<Prisma.$VerificationDocumentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserStatus: {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  TRIAL: 'TRIAL',
  PAUSED: 'PAUSED'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const ThemePreference: {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  SYSTEM: 'SYSTEM'
};

export type ThemePreference = (typeof ThemePreference)[keyof typeof ThemePreference]


export const ExperienceLevel: {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  EXPERT: 'EXPERT'
};

export type ExperienceLevel = (typeof ExperienceLevel)[keyof typeof ExperienceLevel]


export const UserInterestType: {
  INTEREST: 'INTEREST',
  SERVICE: 'SERVICE'
};

export type UserInterestType = (typeof UserInterestType)[keyof typeof UserInterestType]


export const DocumentType: {
  CERTIFICATION: 'CERTIFICATION',
  LICENSE: 'LICENSE',
  TRAINING_CERTIFICATE: 'TRAINING_CERTIFICATE',
  ID_DOCUMENT: 'ID_DOCUMENT',
  OTHER: 'OTHER'
};

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType]


export const DocumentStatus: {
  UPLOADED: 'UPLOADED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type DocumentStatus = (typeof DocumentStatus)[keyof typeof DocumentStatus]

}

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type ThemePreference = $Enums.ThemePreference

export const ThemePreference: typeof $Enums.ThemePreference

export type ExperienceLevel = $Enums.ExperienceLevel

export const ExperienceLevel: typeof $Enums.ExperienceLevel

export type UserInterestType = $Enums.UserInterestType

export const UserInterestType: typeof $Enums.UserInterestType

export type DocumentType = $Enums.DocumentType

export const DocumentType: typeof $Enums.DocumentType

export type DocumentStatus = $Enums.DocumentStatus

export const DocumentStatus: typeof $Enums.DocumentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAddress`: Exposes CRUD operations for the **UserAddress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAddresses
    * const userAddresses = await prisma.userAddress.findMany()
    * ```
    */
  get userAddress(): Prisma.UserAddressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userInterest`: Exposes CRUD operations for the **UserInterest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserInterests
    * const userInterests = await prisma.userInterest.findMany()
    * ```
    */
  get userInterest(): Prisma.UserInterestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationDocument`: Exposes CRUD operations for the **VerificationDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationDocuments
    * const verificationDocuments = await prisma.verificationDocument.findMany()
    * ```
    */
  get verificationDocument(): Prisma.VerificationDocumentDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    User: 'User',
    UserAddress: 'UserAddress',
    Category: 'Category',
    UserInterest: 'UserInterest',
    VerificationDocument: 'VerificationDocument'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userAddress" | "category" | "userInterest" | "verificationDocument"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserAddress: {
        payload: Prisma.$UserAddressPayload<ExtArgs>
        fields: Prisma.UserAddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>
          }
          findFirst: {
            args: Prisma.UserAddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>
          }
          findMany: {
            args: Prisma.UserAddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>[]
          }
          create: {
            args: Prisma.UserAddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>
          }
          createMany: {
            args: Prisma.UserAddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>[]
          }
          delete: {
            args: Prisma.UserAddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>
          }
          update: {
            args: Prisma.UserAddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>
          }
          deleteMany: {
            args: Prisma.UserAddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserAddressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>[]
          }
          upsert: {
            args: Prisma.UserAddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAddressPayload>
          }
          aggregate: {
            args: Prisma.UserAddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAddress>
          }
          groupBy: {
            args: Prisma.UserAddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAddressCountArgs<ExtArgs>
            result: $Utils.Optional<UserAddressCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      UserInterest: {
        payload: Prisma.$UserInterestPayload<ExtArgs>
        fields: Prisma.UserInterestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserInterestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserInterestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>
          }
          findFirst: {
            args: Prisma.UserInterestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserInterestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>
          }
          findMany: {
            args: Prisma.UserInterestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>[]
          }
          create: {
            args: Prisma.UserInterestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>
          }
          createMany: {
            args: Prisma.UserInterestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserInterestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>[]
          }
          delete: {
            args: Prisma.UserInterestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>
          }
          update: {
            args: Prisma.UserInterestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>
          }
          deleteMany: {
            args: Prisma.UserInterestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserInterestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserInterestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>[]
          }
          upsert: {
            args: Prisma.UserInterestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserInterestPayload>
          }
          aggregate: {
            args: Prisma.UserInterestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserInterest>
          }
          groupBy: {
            args: Prisma.UserInterestGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserInterestGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserInterestCountArgs<ExtArgs>
            result: $Utils.Optional<UserInterestCountAggregateOutputType> | number
          }
        }
      }
      VerificationDocument: {
        payload: Prisma.$VerificationDocumentPayload<ExtArgs>
        fields: Prisma.VerificationDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          findFirst: {
            args: Prisma.VerificationDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          findMany: {
            args: Prisma.VerificationDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>[]
          }
          create: {
            args: Prisma.VerificationDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          createMany: {
            args: Prisma.VerificationDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>[]
          }
          delete: {
            args: Prisma.VerificationDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          update: {
            args: Prisma.VerificationDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>[]
          }
          upsert: {
            args: Prisma.VerificationDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationDocumentPayload>
          }
          aggregate: {
            args: Prisma.VerificationDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationDocument>
          }
          groupBy: {
            args: Prisma.VerificationDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationDocumentCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userAddress?: UserAddressOmit
    category?: CategoryOmit
    userInterest?: UserInterestOmit
    verificationDocument?: VerificationDocumentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    addresses: number
    interests: number
    verificationDocuments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | UserCountOutputTypeCountAddressesArgs
    interests?: boolean | UserCountOutputTypeCountInterestsArgs
    verificationDocuments?: boolean | UserCountOutputTypeCountVerificationDocumentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAddressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInterestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInterestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVerificationDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationDocumentWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    userInterests: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userInterests?: boolean | CategoryCountOutputTypeCountUserInterestsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountUserInterestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInterestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    passwordResetAttempts: number | null
    profileCompleteness: number | null
  }

  export type UserSumAggregateOutputType = {
    passwordResetAttempts: number | null
    profileCompleteness: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    emailVerified: boolean | null
    password: string | null
    passwordResetOtp: string | null
    passwordResetExpires: Date | null
    passwordResetAttempts: number | null
    role: $Enums.Role | null
    firstName: string | null
    lastName: string | null
    displayName: string | null
    username: string | null
    avatar: string | null
    bio: string | null
    dateOfBirth: Date | null
    timezone: string | null
    phoneNumber: string | null
    countryCode: string | null
    phoneVerified: boolean | null
    googleId: string | null
    appleId: string | null
    facebookId: string | null
    twitterId: string | null
    hasCompletedOnboarding: boolean | null
    onboardingCompletedAt: Date | null
    profileCompleteness: number | null
    serviceProviderExperienceLevel: $Enums.ExperienceLevel | null
    isServiceProviderVerified: boolean | null
    serviceProviderVerifiedAt: Date | null
    isPremium: boolean | null
    subscriptionStatus: $Enums.SubscriptionStatus | null
    subscriptionTier: string | null
    subscriptionStartDate: Date | null
    subscriptionEndDate: Date | null
    themePreference: $Enums.ThemePreference | null
    notificationsEnabled: boolean | null
    marketingNotifications: boolean | null
    preferredLanguage: string | null
    isProfilePublic: boolean | null
    dataAnalyticsEnabled: boolean | null
    status: $Enums.UserStatus | null
    lastLoginAt: Date | null
    lastActiveAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    emailVerified: boolean | null
    password: string | null
    passwordResetOtp: string | null
    passwordResetExpires: Date | null
    passwordResetAttempts: number | null
    role: $Enums.Role | null
    firstName: string | null
    lastName: string | null
    displayName: string | null
    username: string | null
    avatar: string | null
    bio: string | null
    dateOfBirth: Date | null
    timezone: string | null
    phoneNumber: string | null
    countryCode: string | null
    phoneVerified: boolean | null
    googleId: string | null
    appleId: string | null
    facebookId: string | null
    twitterId: string | null
    hasCompletedOnboarding: boolean | null
    onboardingCompletedAt: Date | null
    profileCompleteness: number | null
    serviceProviderExperienceLevel: $Enums.ExperienceLevel | null
    isServiceProviderVerified: boolean | null
    serviceProviderVerifiedAt: Date | null
    isPremium: boolean | null
    subscriptionStatus: $Enums.SubscriptionStatus | null
    subscriptionTier: string | null
    subscriptionStartDate: Date | null
    subscriptionEndDate: Date | null
    themePreference: $Enums.ThemePreference | null
    notificationsEnabled: boolean | null
    marketingNotifications: boolean | null
    preferredLanguage: string | null
    isProfilePublic: boolean | null
    dataAnalyticsEnabled: boolean | null
    status: $Enums.UserStatus | null
    lastLoginAt: Date | null
    lastActiveAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    email: number
    emailVerified: number
    password: number
    passwordResetOtp: number
    passwordResetExpires: number
    passwordResetAttempts: number
    role: number
    firstName: number
    lastName: number
    displayName: number
    username: number
    avatar: number
    bio: number
    dateOfBirth: number
    timezone: number
    phoneNumber: number
    countryCode: number
    phoneVerified: number
    googleId: number
    appleId: number
    facebookId: number
    twitterId: number
    hasCompletedOnboarding: number
    onboardingCompletedAt: number
    profileCompleteness: number
    serviceProviderExperienceLevel: number
    isServiceProviderVerified: number
    serviceProviderVerifiedAt: number
    isPremium: number
    subscriptionStatus: number
    subscriptionTier: number
    subscriptionStartDate: number
    subscriptionEndDate: number
    themePreference: number
    notificationsEnabled: number
    marketingNotifications: number
    preferredLanguage: number
    isProfilePublic: number
    dataAnalyticsEnabled: number
    status: number
    lastLoginAt: number
    lastActiveAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    passwordResetAttempts?: true
    profileCompleteness?: true
  }

  export type UserSumAggregateInputType = {
    passwordResetAttempts?: true
    profileCompleteness?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    emailVerified?: true
    password?: true
    passwordResetOtp?: true
    passwordResetExpires?: true
    passwordResetAttempts?: true
    role?: true
    firstName?: true
    lastName?: true
    displayName?: true
    username?: true
    avatar?: true
    bio?: true
    dateOfBirth?: true
    timezone?: true
    phoneNumber?: true
    countryCode?: true
    phoneVerified?: true
    googleId?: true
    appleId?: true
    facebookId?: true
    twitterId?: true
    hasCompletedOnboarding?: true
    onboardingCompletedAt?: true
    profileCompleteness?: true
    serviceProviderExperienceLevel?: true
    isServiceProviderVerified?: true
    serviceProviderVerifiedAt?: true
    isPremium?: true
    subscriptionStatus?: true
    subscriptionTier?: true
    subscriptionStartDate?: true
    subscriptionEndDate?: true
    themePreference?: true
    notificationsEnabled?: true
    marketingNotifications?: true
    preferredLanguage?: true
    isProfilePublic?: true
    dataAnalyticsEnabled?: true
    status?: true
    lastLoginAt?: true
    lastActiveAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    emailVerified?: true
    password?: true
    passwordResetOtp?: true
    passwordResetExpires?: true
    passwordResetAttempts?: true
    role?: true
    firstName?: true
    lastName?: true
    displayName?: true
    username?: true
    avatar?: true
    bio?: true
    dateOfBirth?: true
    timezone?: true
    phoneNumber?: true
    countryCode?: true
    phoneVerified?: true
    googleId?: true
    appleId?: true
    facebookId?: true
    twitterId?: true
    hasCompletedOnboarding?: true
    onboardingCompletedAt?: true
    profileCompleteness?: true
    serviceProviderExperienceLevel?: true
    isServiceProviderVerified?: true
    serviceProviderVerifiedAt?: true
    isPremium?: true
    subscriptionStatus?: true
    subscriptionTier?: true
    subscriptionStartDate?: true
    subscriptionEndDate?: true
    themePreference?: true
    notificationsEnabled?: true
    marketingNotifications?: true
    preferredLanguage?: true
    isProfilePublic?: true
    dataAnalyticsEnabled?: true
    status?: true
    lastLoginAt?: true
    lastActiveAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    emailVerified?: true
    password?: true
    passwordResetOtp?: true
    passwordResetExpires?: true
    passwordResetAttempts?: true
    role?: true
    firstName?: true
    lastName?: true
    displayName?: true
    username?: true
    avatar?: true
    bio?: true
    dateOfBirth?: true
    timezone?: true
    phoneNumber?: true
    countryCode?: true
    phoneVerified?: true
    googleId?: true
    appleId?: true
    facebookId?: true
    twitterId?: true
    hasCompletedOnboarding?: true
    onboardingCompletedAt?: true
    profileCompleteness?: true
    serviceProviderExperienceLevel?: true
    isServiceProviderVerified?: true
    serviceProviderVerifiedAt?: true
    isPremium?: true
    subscriptionStatus?: true
    subscriptionTier?: true
    subscriptionStartDate?: true
    subscriptionEndDate?: true
    themePreference?: true
    notificationsEnabled?: true
    marketingNotifications?: true
    preferredLanguage?: true
    isProfilePublic?: true
    dataAnalyticsEnabled?: true
    status?: true
    lastLoginAt?: true
    lastActiveAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    emailVerified: boolean
    password: string | null
    passwordResetOtp: string | null
    passwordResetExpires: Date | null
    passwordResetAttempts: number
    role: $Enums.Role
    firstName: string | null
    lastName: string | null
    displayName: string | null
    username: string | null
    avatar: string | null
    bio: string | null
    dateOfBirth: Date | null
    timezone: string
    phoneNumber: string | null
    countryCode: string | null
    phoneVerified: boolean
    googleId: string | null
    appleId: string | null
    facebookId: string | null
    twitterId: string | null
    hasCompletedOnboarding: boolean
    onboardingCompletedAt: Date | null
    profileCompleteness: number
    serviceProviderExperienceLevel: $Enums.ExperienceLevel | null
    isServiceProviderVerified: boolean
    serviceProviderVerifiedAt: Date | null
    isPremium: boolean
    subscriptionStatus: $Enums.SubscriptionStatus | null
    subscriptionTier: string | null
    subscriptionStartDate: Date | null
    subscriptionEndDate: Date | null
    themePreference: $Enums.ThemePreference
    notificationsEnabled: boolean
    marketingNotifications: boolean
    preferredLanguage: string
    isProfilePublic: boolean
    dataAnalyticsEnabled: boolean
    status: $Enums.UserStatus
    lastLoginAt: Date | null
    lastActiveAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    emailVerified?: boolean
    password?: boolean
    passwordResetOtp?: boolean
    passwordResetExpires?: boolean
    passwordResetAttempts?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    displayName?: boolean
    username?: boolean
    avatar?: boolean
    bio?: boolean
    dateOfBirth?: boolean
    timezone?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    phoneVerified?: boolean
    googleId?: boolean
    appleId?: boolean
    facebookId?: boolean
    twitterId?: boolean
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: boolean
    profileCompleteness?: boolean
    serviceProviderExperienceLevel?: boolean
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: boolean
    isPremium?: boolean
    subscriptionStatus?: boolean
    subscriptionTier?: boolean
    subscriptionStartDate?: boolean
    subscriptionEndDate?: boolean
    themePreference?: boolean
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: boolean
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: boolean
    lastLoginAt?: boolean
    lastActiveAt?: boolean
    addresses?: boolean | User$addressesArgs<ExtArgs>
    interests?: boolean | User$interestsArgs<ExtArgs>
    verificationDocuments?: boolean | User$verificationDocumentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    emailVerified?: boolean
    password?: boolean
    passwordResetOtp?: boolean
    passwordResetExpires?: boolean
    passwordResetAttempts?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    displayName?: boolean
    username?: boolean
    avatar?: boolean
    bio?: boolean
    dateOfBirth?: boolean
    timezone?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    phoneVerified?: boolean
    googleId?: boolean
    appleId?: boolean
    facebookId?: boolean
    twitterId?: boolean
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: boolean
    profileCompleteness?: boolean
    serviceProviderExperienceLevel?: boolean
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: boolean
    isPremium?: boolean
    subscriptionStatus?: boolean
    subscriptionTier?: boolean
    subscriptionStartDate?: boolean
    subscriptionEndDate?: boolean
    themePreference?: boolean
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: boolean
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: boolean
    lastLoginAt?: boolean
    lastActiveAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    emailVerified?: boolean
    password?: boolean
    passwordResetOtp?: boolean
    passwordResetExpires?: boolean
    passwordResetAttempts?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    displayName?: boolean
    username?: boolean
    avatar?: boolean
    bio?: boolean
    dateOfBirth?: boolean
    timezone?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    phoneVerified?: boolean
    googleId?: boolean
    appleId?: boolean
    facebookId?: boolean
    twitterId?: boolean
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: boolean
    profileCompleteness?: boolean
    serviceProviderExperienceLevel?: boolean
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: boolean
    isPremium?: boolean
    subscriptionStatus?: boolean
    subscriptionTier?: boolean
    subscriptionStartDate?: boolean
    subscriptionEndDate?: boolean
    themePreference?: boolean
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: boolean
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: boolean
    lastLoginAt?: boolean
    lastActiveAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    emailVerified?: boolean
    password?: boolean
    passwordResetOtp?: boolean
    passwordResetExpires?: boolean
    passwordResetAttempts?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    displayName?: boolean
    username?: boolean
    avatar?: boolean
    bio?: boolean
    dateOfBirth?: boolean
    timezone?: boolean
    phoneNumber?: boolean
    countryCode?: boolean
    phoneVerified?: boolean
    googleId?: boolean
    appleId?: boolean
    facebookId?: boolean
    twitterId?: boolean
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: boolean
    profileCompleteness?: boolean
    serviceProviderExperienceLevel?: boolean
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: boolean
    isPremium?: boolean
    subscriptionStatus?: boolean
    subscriptionTier?: boolean
    subscriptionStartDate?: boolean
    subscriptionEndDate?: boolean
    themePreference?: boolean
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: boolean
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: boolean
    lastLoginAt?: boolean
    lastActiveAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "email" | "emailVerified" | "password" | "passwordResetOtp" | "passwordResetExpires" | "passwordResetAttempts" | "role" | "firstName" | "lastName" | "displayName" | "username" | "avatar" | "bio" | "dateOfBirth" | "timezone" | "phoneNumber" | "countryCode" | "phoneVerified" | "googleId" | "appleId" | "facebookId" | "twitterId" | "hasCompletedOnboarding" | "onboardingCompletedAt" | "profileCompleteness" | "serviceProviderExperienceLevel" | "isServiceProviderVerified" | "serviceProviderVerifiedAt" | "isPremium" | "subscriptionStatus" | "subscriptionTier" | "subscriptionStartDate" | "subscriptionEndDate" | "themePreference" | "notificationsEnabled" | "marketingNotifications" | "preferredLanguage" | "isProfilePublic" | "dataAnalyticsEnabled" | "status" | "lastLoginAt" | "lastActiveAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | User$addressesArgs<ExtArgs>
    interests?: boolean | User$interestsArgs<ExtArgs>
    verificationDocuments?: boolean | User$verificationDocumentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      addresses: Prisma.$UserAddressPayload<ExtArgs>[]
      interests: Prisma.$UserInterestPayload<ExtArgs>[]
      verificationDocuments: Prisma.$VerificationDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      email: string
      emailVerified: boolean
      password: string | null
      passwordResetOtp: string | null
      passwordResetExpires: Date | null
      passwordResetAttempts: number
      role: $Enums.Role
      firstName: string | null
      lastName: string | null
      displayName: string | null
      username: string | null
      avatar: string | null
      bio: string | null
      dateOfBirth: Date | null
      timezone: string
      phoneNumber: string | null
      countryCode: string | null
      phoneVerified: boolean
      googleId: string | null
      appleId: string | null
      facebookId: string | null
      twitterId: string | null
      hasCompletedOnboarding: boolean
      onboardingCompletedAt: Date | null
      profileCompleteness: number
      serviceProviderExperienceLevel: $Enums.ExperienceLevel | null
      isServiceProviderVerified: boolean
      serviceProviderVerifiedAt: Date | null
      isPremium: boolean
      subscriptionStatus: $Enums.SubscriptionStatus | null
      subscriptionTier: string | null
      subscriptionStartDate: Date | null
      subscriptionEndDate: Date | null
      themePreference: $Enums.ThemePreference
      notificationsEnabled: boolean
      marketingNotifications: boolean
      preferredLanguage: string
      isProfilePublic: boolean
      dataAnalyticsEnabled: boolean
      status: $Enums.UserStatus
      lastLoginAt: Date | null
      lastActiveAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    addresses<T extends User$addressesArgs<ExtArgs> = {}>(args?: Subset<T, User$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    interests<T extends User$interestsArgs<ExtArgs> = {}>(args?: Subset<T, User$interestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    verificationDocuments<T extends User$verificationDocumentsArgs<ExtArgs> = {}>(args?: Subset<T, User$verificationDocumentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly password: FieldRef<"User", 'String'>
    readonly passwordResetOtp: FieldRef<"User", 'String'>
    readonly passwordResetExpires: FieldRef<"User", 'DateTime'>
    readonly passwordResetAttempts: FieldRef<"User", 'Int'>
    readonly role: FieldRef<"User", 'Role'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly dateOfBirth: FieldRef<"User", 'DateTime'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly countryCode: FieldRef<"User", 'String'>
    readonly phoneVerified: FieldRef<"User", 'Boolean'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly appleId: FieldRef<"User", 'String'>
    readonly facebookId: FieldRef<"User", 'String'>
    readonly twitterId: FieldRef<"User", 'String'>
    readonly hasCompletedOnboarding: FieldRef<"User", 'Boolean'>
    readonly onboardingCompletedAt: FieldRef<"User", 'DateTime'>
    readonly profileCompleteness: FieldRef<"User", 'Int'>
    readonly serviceProviderExperienceLevel: FieldRef<"User", 'ExperienceLevel'>
    readonly isServiceProviderVerified: FieldRef<"User", 'Boolean'>
    readonly serviceProviderVerifiedAt: FieldRef<"User", 'DateTime'>
    readonly isPremium: FieldRef<"User", 'Boolean'>
    readonly subscriptionStatus: FieldRef<"User", 'SubscriptionStatus'>
    readonly subscriptionTier: FieldRef<"User", 'String'>
    readonly subscriptionStartDate: FieldRef<"User", 'DateTime'>
    readonly subscriptionEndDate: FieldRef<"User", 'DateTime'>
    readonly themePreference: FieldRef<"User", 'ThemePreference'>
    readonly notificationsEnabled: FieldRef<"User", 'Boolean'>
    readonly marketingNotifications: FieldRef<"User", 'Boolean'>
    readonly preferredLanguage: FieldRef<"User", 'String'>
    readonly isProfilePublic: FieldRef<"User", 'Boolean'>
    readonly dataAnalyticsEnabled: FieldRef<"User", 'Boolean'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly lastActiveAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.addresses
   */
  export type User$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    where?: UserAddressWhereInput
    orderBy?: UserAddressOrderByWithRelationInput | UserAddressOrderByWithRelationInput[]
    cursor?: UserAddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAddressScalarFieldEnum | UserAddressScalarFieldEnum[]
  }

  /**
   * User.interests
   */
  export type User$interestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    where?: UserInterestWhereInput
    orderBy?: UserInterestOrderByWithRelationInput | UserInterestOrderByWithRelationInput[]
    cursor?: UserInterestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInterestScalarFieldEnum | UserInterestScalarFieldEnum[]
  }

  /**
   * User.verificationDocuments
   */
  export type User$verificationDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    where?: VerificationDocumentWhereInput
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    cursor?: VerificationDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VerificationDocumentScalarFieldEnum | VerificationDocumentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserAddress
   */

  export type AggregateUserAddress = {
    _count: UserAddressCountAggregateOutputType | null
    _avg: UserAddressAvgAggregateOutputType | null
    _sum: UserAddressSumAggregateOutputType | null
    _min: UserAddressMinAggregateOutputType | null
    _max: UserAddressMaxAggregateOutputType | null
  }

  export type UserAddressAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type UserAddressSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type UserAddressMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    placeId: string | null
    addressName: string | null
    formattedAddress: string | null
    latitude: number | null
    longitude: number | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    isPrimary: boolean | null
  }

  export type UserAddressMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    placeId: string | null
    addressName: string | null
    formattedAddress: string | null
    latitude: number | null
    longitude: number | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    isPrimary: boolean | null
  }

  export type UserAddressCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    placeId: number
    addressName: number
    formattedAddress: number
    latitude: number
    longitude: number
    city: number
    state: number
    country: number
    postalCode: number
    isPrimary: number
    _all: number
  }


  export type UserAddressAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type UserAddressSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type UserAddressMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    placeId?: true
    addressName?: true
    formattedAddress?: true
    latitude?: true
    longitude?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    isPrimary?: true
  }

  export type UserAddressMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    placeId?: true
    addressName?: true
    formattedAddress?: true
    latitude?: true
    longitude?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    isPrimary?: true
  }

  export type UserAddressCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    placeId?: true
    addressName?: true
    formattedAddress?: true
    latitude?: true
    longitude?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    isPrimary?: true
    _all?: true
  }

  export type UserAddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAddress to aggregate.
     */
    where?: UserAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAddresses to fetch.
     */
    orderBy?: UserAddressOrderByWithRelationInput | UserAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAddresses
    **/
    _count?: true | UserAddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAddressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserAddressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAddressMaxAggregateInputType
  }

  export type GetUserAddressAggregateType<T extends UserAddressAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAddress[P]>
      : GetScalarType<T[P], AggregateUserAddress[P]>
  }




  export type UserAddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAddressWhereInput
    orderBy?: UserAddressOrderByWithAggregationInput | UserAddressOrderByWithAggregationInput[]
    by: UserAddressScalarFieldEnum[] | UserAddressScalarFieldEnum
    having?: UserAddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAddressCountAggregateInputType | true
    _avg?: UserAddressAvgAggregateInputType
    _sum?: UserAddressSumAggregateInputType
    _min?: UserAddressMinAggregateInputType
    _max?: UserAddressMaxAggregateInputType
  }

  export type UserAddressGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    placeId: string | null
    addressName: string
    formattedAddress: string
    latitude: number
    longitude: number
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
    isPrimary: boolean
    _count: UserAddressCountAggregateOutputType | null
    _avg: UserAddressAvgAggregateOutputType | null
    _sum: UserAddressSumAggregateOutputType | null
    _min: UserAddressMinAggregateOutputType | null
    _max: UserAddressMaxAggregateOutputType | null
  }

  type GetUserAddressGroupByPayload<T extends UserAddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAddressGroupByOutputType[P]>
            : GetScalarType<T[P], UserAddressGroupByOutputType[P]>
        }
      >
    >


  export type UserAddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    placeId?: boolean
    addressName?: boolean
    formattedAddress?: boolean
    latitude?: boolean
    longitude?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    isPrimary?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAddress"]>

  export type UserAddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    placeId?: boolean
    addressName?: boolean
    formattedAddress?: boolean
    latitude?: boolean
    longitude?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    isPrimary?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAddress"]>

  export type UserAddressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    placeId?: boolean
    addressName?: boolean
    formattedAddress?: boolean
    latitude?: boolean
    longitude?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    isPrimary?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAddress"]>

  export type UserAddressSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    placeId?: boolean
    addressName?: boolean
    formattedAddress?: boolean
    latitude?: boolean
    longitude?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    isPrimary?: boolean
  }

  export type UserAddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "userId" | "placeId" | "addressName" | "formattedAddress" | "latitude" | "longitude" | "city" | "state" | "country" | "postalCode" | "isPrimary", ExtArgs["result"]["userAddress"]>
  export type UserAddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserAddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserAddressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserAddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAddress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      userId: string
      placeId: string | null
      addressName: string
      formattedAddress: string
      latitude: number
      longitude: number
      city: string | null
      state: string | null
      country: string | null
      postalCode: string | null
      isPrimary: boolean
    }, ExtArgs["result"]["userAddress"]>
    composites: {}
  }

  type UserAddressGetPayload<S extends boolean | null | undefined | UserAddressDefaultArgs> = $Result.GetResult<Prisma.$UserAddressPayload, S>

  type UserAddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAddressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAddressCountAggregateInputType | true
    }

  export interface UserAddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAddress'], meta: { name: 'UserAddress' } }
    /**
     * Find zero or one UserAddress that matches the filter.
     * @param {UserAddressFindUniqueArgs} args - Arguments to find a UserAddress
     * @example
     * // Get one UserAddress
     * const userAddress = await prisma.userAddress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAddressFindUniqueArgs>(args: SelectSubset<T, UserAddressFindUniqueArgs<ExtArgs>>): Prisma__UserAddressClient<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAddress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAddressFindUniqueOrThrowArgs} args - Arguments to find a UserAddress
     * @example
     * // Get one UserAddress
     * const userAddress = await prisma.userAddress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAddressFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAddressClient<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAddress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAddressFindFirstArgs} args - Arguments to find a UserAddress
     * @example
     * // Get one UserAddress
     * const userAddress = await prisma.userAddress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAddressFindFirstArgs>(args?: SelectSubset<T, UserAddressFindFirstArgs<ExtArgs>>): Prisma__UserAddressClient<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAddress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAddressFindFirstOrThrowArgs} args - Arguments to find a UserAddress
     * @example
     * // Get one UserAddress
     * const userAddress = await prisma.userAddress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAddressFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAddressClient<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAddresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAddresses
     * const userAddresses = await prisma.userAddress.findMany()
     * 
     * // Get first 10 UserAddresses
     * const userAddresses = await prisma.userAddress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAddressWithIdOnly = await prisma.userAddress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAddressFindManyArgs>(args?: SelectSubset<T, UserAddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAddress.
     * @param {UserAddressCreateArgs} args - Arguments to create a UserAddress.
     * @example
     * // Create one UserAddress
     * const UserAddress = await prisma.userAddress.create({
     *   data: {
     *     // ... data to create a UserAddress
     *   }
     * })
     * 
     */
    create<T extends UserAddressCreateArgs>(args: SelectSubset<T, UserAddressCreateArgs<ExtArgs>>): Prisma__UserAddressClient<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAddresses.
     * @param {UserAddressCreateManyArgs} args - Arguments to create many UserAddresses.
     * @example
     * // Create many UserAddresses
     * const userAddress = await prisma.userAddress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAddressCreateManyArgs>(args?: SelectSubset<T, UserAddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAddresses and returns the data saved in the database.
     * @param {UserAddressCreateManyAndReturnArgs} args - Arguments to create many UserAddresses.
     * @example
     * // Create many UserAddresses
     * const userAddress = await prisma.userAddress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAddresses and only return the `id`
     * const userAddressWithIdOnly = await prisma.userAddress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAddressCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAddress.
     * @param {UserAddressDeleteArgs} args - Arguments to delete one UserAddress.
     * @example
     * // Delete one UserAddress
     * const UserAddress = await prisma.userAddress.delete({
     *   where: {
     *     // ... filter to delete one UserAddress
     *   }
     * })
     * 
     */
    delete<T extends UserAddressDeleteArgs>(args: SelectSubset<T, UserAddressDeleteArgs<ExtArgs>>): Prisma__UserAddressClient<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAddress.
     * @param {UserAddressUpdateArgs} args - Arguments to update one UserAddress.
     * @example
     * // Update one UserAddress
     * const userAddress = await prisma.userAddress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAddressUpdateArgs>(args: SelectSubset<T, UserAddressUpdateArgs<ExtArgs>>): Prisma__UserAddressClient<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAddresses.
     * @param {UserAddressDeleteManyArgs} args - Arguments to filter UserAddresses to delete.
     * @example
     * // Delete a few UserAddresses
     * const { count } = await prisma.userAddress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAddressDeleteManyArgs>(args?: SelectSubset<T, UserAddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAddresses
     * const userAddress = await prisma.userAddress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAddressUpdateManyArgs>(args: SelectSubset<T, UserAddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAddresses and returns the data updated in the database.
     * @param {UserAddressUpdateManyAndReturnArgs} args - Arguments to update many UserAddresses.
     * @example
     * // Update many UserAddresses
     * const userAddress = await prisma.userAddress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserAddresses and only return the `id`
     * const userAddressWithIdOnly = await prisma.userAddress.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserAddressUpdateManyAndReturnArgs>(args: SelectSubset<T, UserAddressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAddress.
     * @param {UserAddressUpsertArgs} args - Arguments to update or create a UserAddress.
     * @example
     * // Update or create a UserAddress
     * const userAddress = await prisma.userAddress.upsert({
     *   create: {
     *     // ... data to create a UserAddress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAddress we want to update
     *   }
     * })
     */
    upsert<T extends UserAddressUpsertArgs>(args: SelectSubset<T, UserAddressUpsertArgs<ExtArgs>>): Prisma__UserAddressClient<$Result.GetResult<Prisma.$UserAddressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAddresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAddressCountArgs} args - Arguments to filter UserAddresses to count.
     * @example
     * // Count the number of UserAddresses
     * const count = await prisma.userAddress.count({
     *   where: {
     *     // ... the filter for the UserAddresses we want to count
     *   }
     * })
    **/
    count<T extends UserAddressCountArgs>(
      args?: Subset<T, UserAddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAddressAggregateArgs>(args: Subset<T, UserAddressAggregateArgs>): Prisma.PrismaPromise<GetUserAddressAggregateType<T>>

    /**
     * Group by UserAddress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAddressGroupByArgs} args - Group by arguments.
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
      T extends UserAddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAddressGroupByArgs['orderBy'] }
        : { orderBy?: UserAddressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserAddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAddress model
   */
  readonly fields: UserAddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAddress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserAddress model
   */
  interface UserAddressFieldRefs {
    readonly id: FieldRef<"UserAddress", 'String'>
    readonly createdAt: FieldRef<"UserAddress", 'DateTime'>
    readonly updatedAt: FieldRef<"UserAddress", 'DateTime'>
    readonly userId: FieldRef<"UserAddress", 'String'>
    readonly placeId: FieldRef<"UserAddress", 'String'>
    readonly addressName: FieldRef<"UserAddress", 'String'>
    readonly formattedAddress: FieldRef<"UserAddress", 'String'>
    readonly latitude: FieldRef<"UserAddress", 'Float'>
    readonly longitude: FieldRef<"UserAddress", 'Float'>
    readonly city: FieldRef<"UserAddress", 'String'>
    readonly state: FieldRef<"UserAddress", 'String'>
    readonly country: FieldRef<"UserAddress", 'String'>
    readonly postalCode: FieldRef<"UserAddress", 'String'>
    readonly isPrimary: FieldRef<"UserAddress", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * UserAddress findUnique
   */
  export type UserAddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * Filter, which UserAddress to fetch.
     */
    where: UserAddressWhereUniqueInput
  }

  /**
   * UserAddress findUniqueOrThrow
   */
  export type UserAddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * Filter, which UserAddress to fetch.
     */
    where: UserAddressWhereUniqueInput
  }

  /**
   * UserAddress findFirst
   */
  export type UserAddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * Filter, which UserAddress to fetch.
     */
    where?: UserAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAddresses to fetch.
     */
    orderBy?: UserAddressOrderByWithRelationInput | UserAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAddresses.
     */
    cursor?: UserAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAddresses.
     */
    distinct?: UserAddressScalarFieldEnum | UserAddressScalarFieldEnum[]
  }

  /**
   * UserAddress findFirstOrThrow
   */
  export type UserAddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * Filter, which UserAddress to fetch.
     */
    where?: UserAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAddresses to fetch.
     */
    orderBy?: UserAddressOrderByWithRelationInput | UserAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAddresses.
     */
    cursor?: UserAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAddresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAddresses.
     */
    distinct?: UserAddressScalarFieldEnum | UserAddressScalarFieldEnum[]
  }

  /**
   * UserAddress findMany
   */
  export type UserAddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * Filter, which UserAddresses to fetch.
     */
    where?: UserAddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAddresses to fetch.
     */
    orderBy?: UserAddressOrderByWithRelationInput | UserAddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAddresses.
     */
    cursor?: UserAddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAddresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAddresses.
     */
    skip?: number
    distinct?: UserAddressScalarFieldEnum | UserAddressScalarFieldEnum[]
  }

  /**
   * UserAddress create
   */
  export type UserAddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAddress.
     */
    data: XOR<UserAddressCreateInput, UserAddressUncheckedCreateInput>
  }

  /**
   * UserAddress createMany
   */
  export type UserAddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAddresses.
     */
    data: UserAddressCreateManyInput | UserAddressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAddress createManyAndReturn
   */
  export type UserAddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * The data used to create many UserAddresses.
     */
    data: UserAddressCreateManyInput | UserAddressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAddress update
   */
  export type UserAddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAddress.
     */
    data: XOR<UserAddressUpdateInput, UserAddressUncheckedUpdateInput>
    /**
     * Choose, which UserAddress to update.
     */
    where: UserAddressWhereUniqueInput
  }

  /**
   * UserAddress updateMany
   */
  export type UserAddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAddresses.
     */
    data: XOR<UserAddressUpdateManyMutationInput, UserAddressUncheckedUpdateManyInput>
    /**
     * Filter which UserAddresses to update
     */
    where?: UserAddressWhereInput
    /**
     * Limit how many UserAddresses to update.
     */
    limit?: number
  }

  /**
   * UserAddress updateManyAndReturn
   */
  export type UserAddressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * The data used to update UserAddresses.
     */
    data: XOR<UserAddressUpdateManyMutationInput, UserAddressUncheckedUpdateManyInput>
    /**
     * Filter which UserAddresses to update
     */
    where?: UserAddressWhereInput
    /**
     * Limit how many UserAddresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAddress upsert
   */
  export type UserAddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAddress to update in case it exists.
     */
    where: UserAddressWhereUniqueInput
    /**
     * In case the UserAddress found by the `where` argument doesn't exist, create a new UserAddress with this data.
     */
    create: XOR<UserAddressCreateInput, UserAddressUncheckedCreateInput>
    /**
     * In case the UserAddress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAddressUpdateInput, UserAddressUncheckedUpdateInput>
  }

  /**
   * UserAddress delete
   */
  export type UserAddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
    /**
     * Filter which UserAddress to delete.
     */
    where: UserAddressWhereUniqueInput
  }

  /**
   * UserAddress deleteMany
   */
  export type UserAddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAddresses to delete
     */
    where?: UserAddressWhereInput
    /**
     * Limit how many UserAddresses to delete.
     */
    limit?: number
  }

  /**
   * UserAddress without action
   */
  export type UserAddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAddress
     */
    select?: UserAddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAddress
     */
    omit?: UserAddressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAddressInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    description: string | null
    isActive: boolean | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    description: string | null
    isActive: boolean | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    description: number
    isActive: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    isActive?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    isActive?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    isActive?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    description: string | null
    isActive: boolean
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    userInterests?: boolean | Category$userInterestsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name" | "description" | "isActive", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userInterests?: boolean | Category$userInterestsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      userInterests: Prisma.$UserInterestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      description: string | null
      isActive: boolean
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
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
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userInterests<T extends Category$userInterestsArgs<ExtArgs> = {}>(args?: Subset<T, Category$userInterestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
    readonly name: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly isActive: FieldRef<"Category", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.userInterests
   */
  export type Category$userInterestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    where?: UserInterestWhereInput
    orderBy?: UserInterestOrderByWithRelationInput | UserInterestOrderByWithRelationInput[]
    cursor?: UserInterestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserInterestScalarFieldEnum | UserInterestScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model UserInterest
   */

  export type AggregateUserInterest = {
    _count: UserInterestCountAggregateOutputType | null
    _min: UserInterestMinAggregateOutputType | null
    _max: UserInterestMaxAggregateOutputType | null
  }

  export type UserInterestMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    categoryId: string | null
    type: $Enums.UserInterestType | null
  }

  export type UserInterestMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    categoryId: string | null
    type: $Enums.UserInterestType | null
  }

  export type UserInterestCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    categoryId: number
    type: number
    _all: number
  }


  export type UserInterestMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    categoryId?: true
    type?: true
  }

  export type UserInterestMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    categoryId?: true
    type?: true
  }

  export type UserInterestCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    categoryId?: true
    type?: true
    _all?: true
  }

  export type UserInterestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInterest to aggregate.
     */
    where?: UserInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInterests to fetch.
     */
    orderBy?: UserInterestOrderByWithRelationInput | UserInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserInterests
    **/
    _count?: true | UserInterestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserInterestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserInterestMaxAggregateInputType
  }

  export type GetUserInterestAggregateType<T extends UserInterestAggregateArgs> = {
        [P in keyof T & keyof AggregateUserInterest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserInterest[P]>
      : GetScalarType<T[P], AggregateUserInterest[P]>
  }




  export type UserInterestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInterestWhereInput
    orderBy?: UserInterestOrderByWithAggregationInput | UserInterestOrderByWithAggregationInput[]
    by: UserInterestScalarFieldEnum[] | UserInterestScalarFieldEnum
    having?: UserInterestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserInterestCountAggregateInputType | true
    _min?: UserInterestMinAggregateInputType
    _max?: UserInterestMaxAggregateInputType
  }

  export type UserInterestGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    categoryId: string
    type: $Enums.UserInterestType
    _count: UserInterestCountAggregateOutputType | null
    _min: UserInterestMinAggregateOutputType | null
    _max: UserInterestMaxAggregateOutputType | null
  }

  type GetUserInterestGroupByPayload<T extends UserInterestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserInterestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserInterestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserInterestGroupByOutputType[P]>
            : GetScalarType<T[P], UserInterestGroupByOutputType[P]>
        }
      >
    >


  export type UserInterestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    categoryId?: boolean
    type?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInterest"]>

  export type UserInterestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    categoryId?: boolean
    type?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInterest"]>

  export type UserInterestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    categoryId?: boolean
    type?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userInterest"]>

  export type UserInterestSelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    categoryId?: boolean
    type?: boolean
  }

  export type UserInterestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "categoryId" | "type", ExtArgs["result"]["userInterest"]>
  export type UserInterestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type UserInterestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type UserInterestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $UserInterestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserInterest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      userId: string
      categoryId: string
      type: $Enums.UserInterestType
    }, ExtArgs["result"]["userInterest"]>
    composites: {}
  }

  type UserInterestGetPayload<S extends boolean | null | undefined | UserInterestDefaultArgs> = $Result.GetResult<Prisma.$UserInterestPayload, S>

  type UserInterestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserInterestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserInterestCountAggregateInputType | true
    }

  export interface UserInterestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserInterest'], meta: { name: 'UserInterest' } }
    /**
     * Find zero or one UserInterest that matches the filter.
     * @param {UserInterestFindUniqueArgs} args - Arguments to find a UserInterest
     * @example
     * // Get one UserInterest
     * const userInterest = await prisma.userInterest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserInterestFindUniqueArgs>(args: SelectSubset<T, UserInterestFindUniqueArgs<ExtArgs>>): Prisma__UserInterestClient<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserInterest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserInterestFindUniqueOrThrowArgs} args - Arguments to find a UserInterest
     * @example
     * // Get one UserInterest
     * const userInterest = await prisma.userInterest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserInterestFindUniqueOrThrowArgs>(args: SelectSubset<T, UserInterestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserInterestClient<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInterest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestFindFirstArgs} args - Arguments to find a UserInterest
     * @example
     * // Get one UserInterest
     * const userInterest = await prisma.userInterest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserInterestFindFirstArgs>(args?: SelectSubset<T, UserInterestFindFirstArgs<ExtArgs>>): Prisma__UserInterestClient<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserInterest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestFindFirstOrThrowArgs} args - Arguments to find a UserInterest
     * @example
     * // Get one UserInterest
     * const userInterest = await prisma.userInterest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserInterestFindFirstOrThrowArgs>(args?: SelectSubset<T, UserInterestFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserInterestClient<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserInterests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInterests
     * const userInterests = await prisma.userInterest.findMany()
     * 
     * // Get first 10 UserInterests
     * const userInterests = await prisma.userInterest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userInterestWithIdOnly = await prisma.userInterest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserInterestFindManyArgs>(args?: SelectSubset<T, UserInterestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserInterest.
     * @param {UserInterestCreateArgs} args - Arguments to create a UserInterest.
     * @example
     * // Create one UserInterest
     * const UserInterest = await prisma.userInterest.create({
     *   data: {
     *     // ... data to create a UserInterest
     *   }
     * })
     * 
     */
    create<T extends UserInterestCreateArgs>(args: SelectSubset<T, UserInterestCreateArgs<ExtArgs>>): Prisma__UserInterestClient<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserInterests.
     * @param {UserInterestCreateManyArgs} args - Arguments to create many UserInterests.
     * @example
     * // Create many UserInterests
     * const userInterest = await prisma.userInterest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserInterestCreateManyArgs>(args?: SelectSubset<T, UserInterestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserInterests and returns the data saved in the database.
     * @param {UserInterestCreateManyAndReturnArgs} args - Arguments to create many UserInterests.
     * @example
     * // Create many UserInterests
     * const userInterest = await prisma.userInterest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserInterests and only return the `id`
     * const userInterestWithIdOnly = await prisma.userInterest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserInterestCreateManyAndReturnArgs>(args?: SelectSubset<T, UserInterestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserInterest.
     * @param {UserInterestDeleteArgs} args - Arguments to delete one UserInterest.
     * @example
     * // Delete one UserInterest
     * const UserInterest = await prisma.userInterest.delete({
     *   where: {
     *     // ... filter to delete one UserInterest
     *   }
     * })
     * 
     */
    delete<T extends UserInterestDeleteArgs>(args: SelectSubset<T, UserInterestDeleteArgs<ExtArgs>>): Prisma__UserInterestClient<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserInterest.
     * @param {UserInterestUpdateArgs} args - Arguments to update one UserInterest.
     * @example
     * // Update one UserInterest
     * const userInterest = await prisma.userInterest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserInterestUpdateArgs>(args: SelectSubset<T, UserInterestUpdateArgs<ExtArgs>>): Prisma__UserInterestClient<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserInterests.
     * @param {UserInterestDeleteManyArgs} args - Arguments to filter UserInterests to delete.
     * @example
     * // Delete a few UserInterests
     * const { count } = await prisma.userInterest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserInterestDeleteManyArgs>(args?: SelectSubset<T, UserInterestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInterests
     * const userInterest = await prisma.userInterest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserInterestUpdateManyArgs>(args: SelectSubset<T, UserInterestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInterests and returns the data updated in the database.
     * @param {UserInterestUpdateManyAndReturnArgs} args - Arguments to update many UserInterests.
     * @example
     * // Update many UserInterests
     * const userInterest = await prisma.userInterest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserInterests and only return the `id`
     * const userInterestWithIdOnly = await prisma.userInterest.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserInterestUpdateManyAndReturnArgs>(args: SelectSubset<T, UserInterestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserInterest.
     * @param {UserInterestUpsertArgs} args - Arguments to update or create a UserInterest.
     * @example
     * // Update or create a UserInterest
     * const userInterest = await prisma.userInterest.upsert({
     *   create: {
     *     // ... data to create a UserInterest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInterest we want to update
     *   }
     * })
     */
    upsert<T extends UserInterestUpsertArgs>(args: SelectSubset<T, UserInterestUpsertArgs<ExtArgs>>): Prisma__UserInterestClient<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestCountArgs} args - Arguments to filter UserInterests to count.
     * @example
     * // Count the number of UserInterests
     * const count = await prisma.userInterest.count({
     *   where: {
     *     // ... the filter for the UserInterests we want to count
     *   }
     * })
    **/
    count<T extends UserInterestCountArgs>(
      args?: Subset<T, UserInterestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserInterestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserInterestAggregateArgs>(args: Subset<T, UserInterestAggregateArgs>): Prisma.PrismaPromise<GetUserInterestAggregateType<T>>

    /**
     * Group by UserInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestGroupByArgs} args - Group by arguments.
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
      T extends UserInterestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserInterestGroupByArgs['orderBy'] }
        : { orderBy?: UserInterestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserInterestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInterestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserInterest model
   */
  readonly fields: UserInterestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInterest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserInterestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserInterest model
   */
  interface UserInterestFieldRefs {
    readonly id: FieldRef<"UserInterest", 'String'>
    readonly createdAt: FieldRef<"UserInterest", 'DateTime'>
    readonly userId: FieldRef<"UserInterest", 'String'>
    readonly categoryId: FieldRef<"UserInterest", 'String'>
    readonly type: FieldRef<"UserInterest", 'UserInterestType'>
  }
    

  // Custom InputTypes
  /**
   * UserInterest findUnique
   */
  export type UserInterestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * Filter, which UserInterest to fetch.
     */
    where: UserInterestWhereUniqueInput
  }

  /**
   * UserInterest findUniqueOrThrow
   */
  export type UserInterestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * Filter, which UserInterest to fetch.
     */
    where: UserInterestWhereUniqueInput
  }

  /**
   * UserInterest findFirst
   */
  export type UserInterestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * Filter, which UserInterest to fetch.
     */
    where?: UserInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInterests to fetch.
     */
    orderBy?: UserInterestOrderByWithRelationInput | UserInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInterests.
     */
    cursor?: UserInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInterests.
     */
    distinct?: UserInterestScalarFieldEnum | UserInterestScalarFieldEnum[]
  }

  /**
   * UserInterest findFirstOrThrow
   */
  export type UserInterestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * Filter, which UserInterest to fetch.
     */
    where?: UserInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInterests to fetch.
     */
    orderBy?: UserInterestOrderByWithRelationInput | UserInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInterests.
     */
    cursor?: UserInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInterests.
     */
    distinct?: UserInterestScalarFieldEnum | UserInterestScalarFieldEnum[]
  }

  /**
   * UserInterest findMany
   */
  export type UserInterestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * Filter, which UserInterests to fetch.
     */
    where?: UserInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInterests to fetch.
     */
    orderBy?: UserInterestOrderByWithRelationInput | UserInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserInterests.
     */
    cursor?: UserInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInterests.
     */
    skip?: number
    distinct?: UserInterestScalarFieldEnum | UserInterestScalarFieldEnum[]
  }

  /**
   * UserInterest create
   */
  export type UserInterestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * The data needed to create a UserInterest.
     */
    data: XOR<UserInterestCreateInput, UserInterestUncheckedCreateInput>
  }

  /**
   * UserInterest createMany
   */
  export type UserInterestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserInterests.
     */
    data: UserInterestCreateManyInput | UserInterestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserInterest createManyAndReturn
   */
  export type UserInterestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * The data used to create many UserInterests.
     */
    data: UserInterestCreateManyInput | UserInterestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInterest update
   */
  export type UserInterestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * The data needed to update a UserInterest.
     */
    data: XOR<UserInterestUpdateInput, UserInterestUncheckedUpdateInput>
    /**
     * Choose, which UserInterest to update.
     */
    where: UserInterestWhereUniqueInput
  }

  /**
   * UserInterest updateMany
   */
  export type UserInterestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserInterests.
     */
    data: XOR<UserInterestUpdateManyMutationInput, UserInterestUncheckedUpdateManyInput>
    /**
     * Filter which UserInterests to update
     */
    where?: UserInterestWhereInput
    /**
     * Limit how many UserInterests to update.
     */
    limit?: number
  }

  /**
   * UserInterest updateManyAndReturn
   */
  export type UserInterestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * The data used to update UserInterests.
     */
    data: XOR<UserInterestUpdateManyMutationInput, UserInterestUncheckedUpdateManyInput>
    /**
     * Filter which UserInterests to update
     */
    where?: UserInterestWhereInput
    /**
     * Limit how many UserInterests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserInterest upsert
   */
  export type UserInterestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * The filter to search for the UserInterest to update in case it exists.
     */
    where: UserInterestWhereUniqueInput
    /**
     * In case the UserInterest found by the `where` argument doesn't exist, create a new UserInterest with this data.
     */
    create: XOR<UserInterestCreateInput, UserInterestUncheckedCreateInput>
    /**
     * In case the UserInterest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserInterestUpdateInput, UserInterestUncheckedUpdateInput>
  }

  /**
   * UserInterest delete
   */
  export type UserInterestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
    /**
     * Filter which UserInterest to delete.
     */
    where: UserInterestWhereUniqueInput
  }

  /**
   * UserInterest deleteMany
   */
  export type UserInterestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserInterests to delete
     */
    where?: UserInterestWhereInput
    /**
     * Limit how many UserInterests to delete.
     */
    limit?: number
  }

  /**
   * UserInterest without action
   */
  export type UserInterestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInterest
     */
    select?: UserInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserInterest
     */
    omit?: UserInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInterestInclude<ExtArgs> | null
  }


  /**
   * Model VerificationDocument
   */

  export type AggregateVerificationDocument = {
    _count: VerificationDocumentCountAggregateOutputType | null
    _avg: VerificationDocumentAvgAggregateOutputType | null
    _sum: VerificationDocumentSumAggregateOutputType | null
    _min: VerificationDocumentMinAggregateOutputType | null
    _max: VerificationDocumentMaxAggregateOutputType | null
  }

  export type VerificationDocumentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type VerificationDocumentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type VerificationDocumentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    fileName: string | null
    originalName: string | null
    fileUrl: string | null
    fileType: string | null
    fileSize: number | null
    documentType: $Enums.DocumentType | null
    status: $Enums.DocumentStatus | null
    reviewNotes: string | null
    uploadedAt: Date | null
    reviewedAt: Date | null
    reviewedBy: string | null
  }

  export type VerificationDocumentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    fileName: string | null
    originalName: string | null
    fileUrl: string | null
    fileType: string | null
    fileSize: number | null
    documentType: $Enums.DocumentType | null
    status: $Enums.DocumentStatus | null
    reviewNotes: string | null
    uploadedAt: Date | null
    reviewedAt: Date | null
    reviewedBy: string | null
  }

  export type VerificationDocumentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    userId: number
    fileName: number
    originalName: number
    fileUrl: number
    fileType: number
    fileSize: number
    documentType: number
    status: number
    reviewNotes: number
    uploadedAt: number
    reviewedAt: number
    reviewedBy: number
    _all: number
  }


  export type VerificationDocumentAvgAggregateInputType = {
    fileSize?: true
  }

  export type VerificationDocumentSumAggregateInputType = {
    fileSize?: true
  }

  export type VerificationDocumentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    fileName?: true
    originalName?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    documentType?: true
    status?: true
    reviewNotes?: true
    uploadedAt?: true
    reviewedAt?: true
    reviewedBy?: true
  }

  export type VerificationDocumentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    fileName?: true
    originalName?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    documentType?: true
    status?: true
    reviewNotes?: true
    uploadedAt?: true
    reviewedAt?: true
    reviewedBy?: true
  }

  export type VerificationDocumentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    fileName?: true
    originalName?: true
    fileUrl?: true
    fileType?: true
    fileSize?: true
    documentType?: true
    status?: true
    reviewNotes?: true
    uploadedAt?: true
    reviewedAt?: true
    reviewedBy?: true
    _all?: true
  }

  export type VerificationDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationDocument to aggregate.
     */
    where?: VerificationDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationDocuments to fetch.
     */
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationDocuments
    **/
    _count?: true | VerificationDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VerificationDocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VerificationDocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationDocumentMaxAggregateInputType
  }

  export type GetVerificationDocumentAggregateType<T extends VerificationDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationDocument[P]>
      : GetScalarType<T[P], AggregateVerificationDocument[P]>
  }




  export type VerificationDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationDocumentWhereInput
    orderBy?: VerificationDocumentOrderByWithAggregationInput | VerificationDocumentOrderByWithAggregationInput[]
    by: VerificationDocumentScalarFieldEnum[] | VerificationDocumentScalarFieldEnum
    having?: VerificationDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationDocumentCountAggregateInputType | true
    _avg?: VerificationDocumentAvgAggregateInputType
    _sum?: VerificationDocumentSumAggregateInputType
    _min?: VerificationDocumentMinAggregateInputType
    _max?: VerificationDocumentMaxAggregateInputType
  }

  export type VerificationDocumentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    fileName: string
    originalName: string
    fileUrl: string
    fileType: string
    fileSize: number
    documentType: $Enums.DocumentType
    status: $Enums.DocumentStatus
    reviewNotes: string | null
    uploadedAt: Date
    reviewedAt: Date | null
    reviewedBy: string | null
    _count: VerificationDocumentCountAggregateOutputType | null
    _avg: VerificationDocumentAvgAggregateOutputType | null
    _sum: VerificationDocumentSumAggregateOutputType | null
    _min: VerificationDocumentMinAggregateOutputType | null
    _max: VerificationDocumentMaxAggregateOutputType | null
  }

  type GetVerificationDocumentGroupByPayload<T extends VerificationDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationDocumentGroupByOutputType[P]>
        }
      >
    >


  export type VerificationDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    fileName?: boolean
    originalName?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    documentType?: boolean
    status?: boolean
    reviewNotes?: boolean
    uploadedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationDocument"]>

  export type VerificationDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    fileName?: boolean
    originalName?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    documentType?: boolean
    status?: boolean
    reviewNotes?: boolean
    uploadedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationDocument"]>

  export type VerificationDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    fileName?: boolean
    originalName?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    documentType?: boolean
    status?: boolean
    reviewNotes?: boolean
    uploadedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["verificationDocument"]>

  export type VerificationDocumentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    fileName?: boolean
    originalName?: boolean
    fileUrl?: boolean
    fileType?: boolean
    fileSize?: boolean
    documentType?: boolean
    status?: boolean
    reviewNotes?: boolean
    uploadedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
  }

  export type VerificationDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "userId" | "fileName" | "originalName" | "fileUrl" | "fileType" | "fileSize" | "documentType" | "status" | "reviewNotes" | "uploadedAt" | "reviewedAt" | "reviewedBy", ExtArgs["result"]["verificationDocument"]>
  export type VerificationDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VerificationDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VerificationDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VerificationDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationDocument"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      userId: string
      fileName: string
      originalName: string
      fileUrl: string
      fileType: string
      fileSize: number
      documentType: $Enums.DocumentType
      status: $Enums.DocumentStatus
      reviewNotes: string | null
      uploadedAt: Date
      reviewedAt: Date | null
      reviewedBy: string | null
    }, ExtArgs["result"]["verificationDocument"]>
    composites: {}
  }

  type VerificationDocumentGetPayload<S extends boolean | null | undefined | VerificationDocumentDefaultArgs> = $Result.GetResult<Prisma.$VerificationDocumentPayload, S>

  type VerificationDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationDocumentCountAggregateInputType | true
    }

  export interface VerificationDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationDocument'], meta: { name: 'VerificationDocument' } }
    /**
     * Find zero or one VerificationDocument that matches the filter.
     * @param {VerificationDocumentFindUniqueArgs} args - Arguments to find a VerificationDocument
     * @example
     * // Get one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationDocumentFindUniqueArgs>(args: SelectSubset<T, VerificationDocumentFindUniqueArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationDocumentFindUniqueOrThrowArgs} args - Arguments to find a VerificationDocument
     * @example
     * // Get one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentFindFirstArgs} args - Arguments to find a VerificationDocument
     * @example
     * // Get one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationDocumentFindFirstArgs>(args?: SelectSubset<T, VerificationDocumentFindFirstArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentFindFirstOrThrowArgs} args - Arguments to find a VerificationDocument
     * @example
     * // Get one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationDocuments
     * const verificationDocuments = await prisma.verificationDocument.findMany()
     * 
     * // Get first 10 VerificationDocuments
     * const verificationDocuments = await prisma.verificationDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationDocumentWithIdOnly = await prisma.verificationDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationDocumentFindManyArgs>(args?: SelectSubset<T, VerificationDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationDocument.
     * @param {VerificationDocumentCreateArgs} args - Arguments to create a VerificationDocument.
     * @example
     * // Create one VerificationDocument
     * const VerificationDocument = await prisma.verificationDocument.create({
     *   data: {
     *     // ... data to create a VerificationDocument
     *   }
     * })
     * 
     */
    create<T extends VerificationDocumentCreateArgs>(args: SelectSubset<T, VerificationDocumentCreateArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationDocuments.
     * @param {VerificationDocumentCreateManyArgs} args - Arguments to create many VerificationDocuments.
     * @example
     * // Create many VerificationDocuments
     * const verificationDocument = await prisma.verificationDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationDocumentCreateManyArgs>(args?: SelectSubset<T, VerificationDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationDocuments and returns the data saved in the database.
     * @param {VerificationDocumentCreateManyAndReturnArgs} args - Arguments to create many VerificationDocuments.
     * @example
     * // Create many VerificationDocuments
     * const verificationDocument = await prisma.verificationDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationDocuments and only return the `id`
     * const verificationDocumentWithIdOnly = await prisma.verificationDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationDocument.
     * @param {VerificationDocumentDeleteArgs} args - Arguments to delete one VerificationDocument.
     * @example
     * // Delete one VerificationDocument
     * const VerificationDocument = await prisma.verificationDocument.delete({
     *   where: {
     *     // ... filter to delete one VerificationDocument
     *   }
     * })
     * 
     */
    delete<T extends VerificationDocumentDeleteArgs>(args: SelectSubset<T, VerificationDocumentDeleteArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationDocument.
     * @param {VerificationDocumentUpdateArgs} args - Arguments to update one VerificationDocument.
     * @example
     * // Update one VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationDocumentUpdateArgs>(args: SelectSubset<T, VerificationDocumentUpdateArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationDocuments.
     * @param {VerificationDocumentDeleteManyArgs} args - Arguments to filter VerificationDocuments to delete.
     * @example
     * // Delete a few VerificationDocuments
     * const { count } = await prisma.verificationDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDocumentDeleteManyArgs>(args?: SelectSubset<T, VerificationDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationDocuments
     * const verificationDocument = await prisma.verificationDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationDocumentUpdateManyArgs>(args: SelectSubset<T, VerificationDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationDocuments and returns the data updated in the database.
     * @param {VerificationDocumentUpdateManyAndReturnArgs} args - Arguments to update many VerificationDocuments.
     * @example
     * // Update many VerificationDocuments
     * const verificationDocument = await prisma.verificationDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationDocuments and only return the `id`
     * const verificationDocumentWithIdOnly = await prisma.verificationDocument.updateManyAndReturn({
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
    updateManyAndReturn<T extends VerificationDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationDocument.
     * @param {VerificationDocumentUpsertArgs} args - Arguments to update or create a VerificationDocument.
     * @example
     * // Update or create a VerificationDocument
     * const verificationDocument = await prisma.verificationDocument.upsert({
     *   create: {
     *     // ... data to create a VerificationDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationDocument we want to update
     *   }
     * })
     */
    upsert<T extends VerificationDocumentUpsertArgs>(args: SelectSubset<T, VerificationDocumentUpsertArgs<ExtArgs>>): Prisma__VerificationDocumentClient<$Result.GetResult<Prisma.$VerificationDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentCountArgs} args - Arguments to filter VerificationDocuments to count.
     * @example
     * // Count the number of VerificationDocuments
     * const count = await prisma.verificationDocument.count({
     *   where: {
     *     // ... the filter for the VerificationDocuments we want to count
     *   }
     * })
    **/
    count<T extends VerificationDocumentCountArgs>(
      args?: Subset<T, VerificationDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationDocumentAggregateArgs>(args: Subset<T, VerificationDocumentAggregateArgs>): Prisma.PrismaPromise<GetVerificationDocumentAggregateType<T>>

    /**
     * Group by VerificationDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationDocumentGroupByArgs} args - Group by arguments.
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
      T extends VerificationDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationDocumentGroupByArgs['orderBy'] }
        : { orderBy?: VerificationDocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationDocument model
   */
  readonly fields: VerificationDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the VerificationDocument model
   */
  interface VerificationDocumentFieldRefs {
    readonly id: FieldRef<"VerificationDocument", 'String'>
    readonly createdAt: FieldRef<"VerificationDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"VerificationDocument", 'DateTime'>
    readonly userId: FieldRef<"VerificationDocument", 'String'>
    readonly fileName: FieldRef<"VerificationDocument", 'String'>
    readonly originalName: FieldRef<"VerificationDocument", 'String'>
    readonly fileUrl: FieldRef<"VerificationDocument", 'String'>
    readonly fileType: FieldRef<"VerificationDocument", 'String'>
    readonly fileSize: FieldRef<"VerificationDocument", 'Int'>
    readonly documentType: FieldRef<"VerificationDocument", 'DocumentType'>
    readonly status: FieldRef<"VerificationDocument", 'DocumentStatus'>
    readonly reviewNotes: FieldRef<"VerificationDocument", 'String'>
    readonly uploadedAt: FieldRef<"VerificationDocument", 'DateTime'>
    readonly reviewedAt: FieldRef<"VerificationDocument", 'DateTime'>
    readonly reviewedBy: FieldRef<"VerificationDocument", 'String'>
  }
    

  // Custom InputTypes
  /**
   * VerificationDocument findUnique
   */
  export type VerificationDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocument to fetch.
     */
    where: VerificationDocumentWhereUniqueInput
  }

  /**
   * VerificationDocument findUniqueOrThrow
   */
  export type VerificationDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocument to fetch.
     */
    where: VerificationDocumentWhereUniqueInput
  }

  /**
   * VerificationDocument findFirst
   */
  export type VerificationDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocument to fetch.
     */
    where?: VerificationDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationDocuments to fetch.
     */
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationDocuments.
     */
    cursor?: VerificationDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationDocuments.
     */
    distinct?: VerificationDocumentScalarFieldEnum | VerificationDocumentScalarFieldEnum[]
  }

  /**
   * VerificationDocument findFirstOrThrow
   */
  export type VerificationDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocument to fetch.
     */
    where?: VerificationDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationDocuments to fetch.
     */
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationDocuments.
     */
    cursor?: VerificationDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationDocuments.
     */
    distinct?: VerificationDocumentScalarFieldEnum | VerificationDocumentScalarFieldEnum[]
  }

  /**
   * VerificationDocument findMany
   */
  export type VerificationDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter, which VerificationDocuments to fetch.
     */
    where?: VerificationDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationDocuments to fetch.
     */
    orderBy?: VerificationDocumentOrderByWithRelationInput | VerificationDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationDocuments.
     */
    cursor?: VerificationDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationDocuments.
     */
    skip?: number
    distinct?: VerificationDocumentScalarFieldEnum | VerificationDocumentScalarFieldEnum[]
  }

  /**
   * VerificationDocument create
   */
  export type VerificationDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a VerificationDocument.
     */
    data: XOR<VerificationDocumentCreateInput, VerificationDocumentUncheckedCreateInput>
  }

  /**
   * VerificationDocument createMany
   */
  export type VerificationDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationDocuments.
     */
    data: VerificationDocumentCreateManyInput | VerificationDocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationDocument createManyAndReturn
   */
  export type VerificationDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationDocuments.
     */
    data: VerificationDocumentCreateManyInput | VerificationDocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VerificationDocument update
   */
  export type VerificationDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a VerificationDocument.
     */
    data: XOR<VerificationDocumentUpdateInput, VerificationDocumentUncheckedUpdateInput>
    /**
     * Choose, which VerificationDocument to update.
     */
    where: VerificationDocumentWhereUniqueInput
  }

  /**
   * VerificationDocument updateMany
   */
  export type VerificationDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationDocuments.
     */
    data: XOR<VerificationDocumentUpdateManyMutationInput, VerificationDocumentUncheckedUpdateManyInput>
    /**
     * Filter which VerificationDocuments to update
     */
    where?: VerificationDocumentWhereInput
    /**
     * Limit how many VerificationDocuments to update.
     */
    limit?: number
  }

  /**
   * VerificationDocument updateManyAndReturn
   */
  export type VerificationDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * The data used to update VerificationDocuments.
     */
    data: XOR<VerificationDocumentUpdateManyMutationInput, VerificationDocumentUncheckedUpdateManyInput>
    /**
     * Filter which VerificationDocuments to update
     */
    where?: VerificationDocumentWhereInput
    /**
     * Limit how many VerificationDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VerificationDocument upsert
   */
  export type VerificationDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the VerificationDocument to update in case it exists.
     */
    where: VerificationDocumentWhereUniqueInput
    /**
     * In case the VerificationDocument found by the `where` argument doesn't exist, create a new VerificationDocument with this data.
     */
    create: XOR<VerificationDocumentCreateInput, VerificationDocumentUncheckedCreateInput>
    /**
     * In case the VerificationDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationDocumentUpdateInput, VerificationDocumentUncheckedUpdateInput>
  }

  /**
   * VerificationDocument delete
   */
  export type VerificationDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
    /**
     * Filter which VerificationDocument to delete.
     */
    where: VerificationDocumentWhereUniqueInput
  }

  /**
   * VerificationDocument deleteMany
   */
  export type VerificationDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationDocuments to delete
     */
    where?: VerificationDocumentWhereInput
    /**
     * Limit how many VerificationDocuments to delete.
     */
    limit?: number
  }

  /**
   * VerificationDocument without action
   */
  export type VerificationDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationDocument
     */
    select?: VerificationDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationDocument
     */
    omit?: VerificationDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VerificationDocumentInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    email: 'email',
    emailVerified: 'emailVerified',
    password: 'password',
    passwordResetOtp: 'passwordResetOtp',
    passwordResetExpires: 'passwordResetExpires',
    passwordResetAttempts: 'passwordResetAttempts',
    role: 'role',
    firstName: 'firstName',
    lastName: 'lastName',
    displayName: 'displayName',
    username: 'username',
    avatar: 'avatar',
    bio: 'bio',
    dateOfBirth: 'dateOfBirth',
    timezone: 'timezone',
    phoneNumber: 'phoneNumber',
    countryCode: 'countryCode',
    phoneVerified: 'phoneVerified',
    googleId: 'googleId',
    appleId: 'appleId',
    facebookId: 'facebookId',
    twitterId: 'twitterId',
    hasCompletedOnboarding: 'hasCompletedOnboarding',
    onboardingCompletedAt: 'onboardingCompletedAt',
    profileCompleteness: 'profileCompleteness',
    serviceProviderExperienceLevel: 'serviceProviderExperienceLevel',
    isServiceProviderVerified: 'isServiceProviderVerified',
    serviceProviderVerifiedAt: 'serviceProviderVerifiedAt',
    isPremium: 'isPremium',
    subscriptionStatus: 'subscriptionStatus',
    subscriptionTier: 'subscriptionTier',
    subscriptionStartDate: 'subscriptionStartDate',
    subscriptionEndDate: 'subscriptionEndDate',
    themePreference: 'themePreference',
    notificationsEnabled: 'notificationsEnabled',
    marketingNotifications: 'marketingNotifications',
    preferredLanguage: 'preferredLanguage',
    isProfilePublic: 'isProfilePublic',
    dataAnalyticsEnabled: 'dataAnalyticsEnabled',
    status: 'status',
    lastLoginAt: 'lastLoginAt',
    lastActiveAt: 'lastActiveAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserAddressScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    placeId: 'placeId',
    addressName: 'addressName',
    formattedAddress: 'formattedAddress',
    latitude: 'latitude',
    longitude: 'longitude',
    city: 'city',
    state: 'state',
    country: 'country',
    postalCode: 'postalCode',
    isPrimary: 'isPrimary'
  };

  export type UserAddressScalarFieldEnum = (typeof UserAddressScalarFieldEnum)[keyof typeof UserAddressScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    description: 'description',
    isActive: 'isActive'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const UserInterestScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    categoryId: 'categoryId',
    type: 'type'
  };

  export type UserInterestScalarFieldEnum = (typeof UserInterestScalarFieldEnum)[keyof typeof UserInterestScalarFieldEnum]


  export const VerificationDocumentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    fileName: 'fileName',
    originalName: 'originalName',
    fileUrl: 'fileUrl',
    fileType: 'fileType',
    fileSize: 'fileSize',
    documentType: 'documentType',
    status: 'status',
    reviewNotes: 'reviewNotes',
    uploadedAt: 'uploadedAt',
    reviewedAt: 'reviewedAt',
    reviewedBy: 'reviewedBy'
  };

  export type VerificationDocumentScalarFieldEnum = (typeof VerificationDocumentScalarFieldEnum)[keyof typeof VerificationDocumentScalarFieldEnum]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'ExperienceLevel'
   */
  export type EnumExperienceLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperienceLevel'>
    


  /**
   * Reference to a field of type 'ExperienceLevel[]'
   */
  export type ListEnumExperienceLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperienceLevel[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'ThemePreference'
   */
  export type EnumThemePreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ThemePreference'>
    


  /**
   * Reference to a field of type 'ThemePreference[]'
   */
  export type ListEnumThemePreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ThemePreference[]'>
    


  /**
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'UserInterestType'
   */
  export type EnumUserInterestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserInterestType'>
    


  /**
   * Reference to a field of type 'UserInterestType[]'
   */
  export type ListEnumUserInterestTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserInterestType[]'>
    


  /**
   * Reference to a field of type 'DocumentType'
   */
  export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>
    


  /**
   * Reference to a field of type 'DocumentType[]'
   */
  export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>
    


  /**
   * Reference to a field of type 'DocumentStatus'
   */
  export type EnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus'>
    


  /**
   * Reference to a field of type 'DocumentStatus[]'
   */
  export type ListEnumDocumentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    password?: StringNullableFilter<"User"> | string | null
    passwordResetOtp?: StringNullableFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordResetAttempts?: IntFilter<"User"> | number
    role?: EnumRoleFilter<"User"> | $Enums.Role
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    displayName?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    timezone?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    countryCode?: StringNullableFilter<"User"> | string | null
    phoneVerified?: BoolFilter<"User"> | boolean
    googleId?: StringNullableFilter<"User"> | string | null
    appleId?: StringNullableFilter<"User"> | string | null
    facebookId?: StringNullableFilter<"User"> | string | null
    twitterId?: StringNullableFilter<"User"> | string | null
    hasCompletedOnboarding?: BoolFilter<"User"> | boolean
    onboardingCompletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    profileCompleteness?: IntFilter<"User"> | number
    serviceProviderExperienceLevel?: EnumExperienceLevelNullableFilter<"User"> | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFilter<"User"> | boolean
    serviceProviderVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isPremium?: BoolFilter<"User"> | boolean
    subscriptionStatus?: EnumSubscriptionStatusNullableFilter<"User"> | $Enums.SubscriptionStatus | null
    subscriptionTier?: StringNullableFilter<"User"> | string | null
    subscriptionStartDate?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionEndDate?: DateTimeNullableFilter<"User"> | Date | string | null
    themePreference?: EnumThemePreferenceFilter<"User"> | $Enums.ThemePreference
    notificationsEnabled?: BoolFilter<"User"> | boolean
    marketingNotifications?: BoolFilter<"User"> | boolean
    preferredLanguage?: StringFilter<"User"> | string
    isProfilePublic?: BoolFilter<"User"> | boolean
    dataAnalyticsEnabled?: BoolFilter<"User"> | boolean
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastActiveAt?: DateTimeFilter<"User"> | Date | string
    addresses?: UserAddressListRelationFilter
    interests?: UserInterestListRelationFilter
    verificationDocuments?: VerificationDocumentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrderInput | SortOrder
    passwordResetOtp?: SortOrderInput | SortOrder
    passwordResetExpires?: SortOrderInput | SortOrder
    passwordResetAttempts?: SortOrder
    role?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    timezone?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    phoneVerified?: SortOrder
    googleId?: SortOrderInput | SortOrder
    appleId?: SortOrderInput | SortOrder
    facebookId?: SortOrderInput | SortOrder
    twitterId?: SortOrderInput | SortOrder
    hasCompletedOnboarding?: SortOrder
    onboardingCompletedAt?: SortOrderInput | SortOrder
    profileCompleteness?: SortOrder
    serviceProviderExperienceLevel?: SortOrderInput | SortOrder
    isServiceProviderVerified?: SortOrder
    serviceProviderVerifiedAt?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    subscriptionStatus?: SortOrderInput | SortOrder
    subscriptionTier?: SortOrderInput | SortOrder
    subscriptionStartDate?: SortOrderInput | SortOrder
    subscriptionEndDate?: SortOrderInput | SortOrder
    themePreference?: SortOrder
    notificationsEnabled?: SortOrder
    marketingNotifications?: SortOrder
    preferredLanguage?: SortOrder
    isProfilePublic?: SortOrder
    dataAnalyticsEnabled?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastActiveAt?: SortOrder
    addresses?: UserAddressOrderByRelationAggregateInput
    interests?: UserInterestOrderByRelationAggregateInput
    verificationDocuments?: VerificationDocumentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    googleId?: string
    appleId?: string
    facebookId?: string
    twitterId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    emailVerified?: BoolFilter<"User"> | boolean
    password?: StringNullableFilter<"User"> | string | null
    passwordResetOtp?: StringNullableFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    passwordResetAttempts?: IntFilter<"User"> | number
    role?: EnumRoleFilter<"User"> | $Enums.Role
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    displayName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    timezone?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    countryCode?: StringNullableFilter<"User"> | string | null
    phoneVerified?: BoolFilter<"User"> | boolean
    hasCompletedOnboarding?: BoolFilter<"User"> | boolean
    onboardingCompletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    profileCompleteness?: IntFilter<"User"> | number
    serviceProviderExperienceLevel?: EnumExperienceLevelNullableFilter<"User"> | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFilter<"User"> | boolean
    serviceProviderVerifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isPremium?: BoolFilter<"User"> | boolean
    subscriptionStatus?: EnumSubscriptionStatusNullableFilter<"User"> | $Enums.SubscriptionStatus | null
    subscriptionTier?: StringNullableFilter<"User"> | string | null
    subscriptionStartDate?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionEndDate?: DateTimeNullableFilter<"User"> | Date | string | null
    themePreference?: EnumThemePreferenceFilter<"User"> | $Enums.ThemePreference
    notificationsEnabled?: BoolFilter<"User"> | boolean
    marketingNotifications?: BoolFilter<"User"> | boolean
    preferredLanguage?: StringFilter<"User"> | string
    isProfilePublic?: BoolFilter<"User"> | boolean
    dataAnalyticsEnabled?: BoolFilter<"User"> | boolean
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    lastActiveAt?: DateTimeFilter<"User"> | Date | string
    addresses?: UserAddressListRelationFilter
    interests?: UserInterestListRelationFilter
    verificationDocuments?: VerificationDocumentListRelationFilter
  }, "id" | "email" | "username" | "googleId" | "appleId" | "facebookId" | "twitterId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrderInput | SortOrder
    passwordResetOtp?: SortOrderInput | SortOrder
    passwordResetExpires?: SortOrderInput | SortOrder
    passwordResetAttempts?: SortOrder
    role?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    timezone?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    phoneVerified?: SortOrder
    googleId?: SortOrderInput | SortOrder
    appleId?: SortOrderInput | SortOrder
    facebookId?: SortOrderInput | SortOrder
    twitterId?: SortOrderInput | SortOrder
    hasCompletedOnboarding?: SortOrder
    onboardingCompletedAt?: SortOrderInput | SortOrder
    profileCompleteness?: SortOrder
    serviceProviderExperienceLevel?: SortOrderInput | SortOrder
    isServiceProviderVerified?: SortOrder
    serviceProviderVerifiedAt?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    subscriptionStatus?: SortOrderInput | SortOrder
    subscriptionTier?: SortOrderInput | SortOrder
    subscriptionStartDate?: SortOrderInput | SortOrder
    subscriptionEndDate?: SortOrderInput | SortOrder
    themePreference?: SortOrder
    notificationsEnabled?: SortOrder
    marketingNotifications?: SortOrder
    preferredLanguage?: SortOrder
    isProfilePublic?: SortOrder
    dataAnalyticsEnabled?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    lastActiveAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetOtp?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    passwordResetAttempts?: IntWithAggregatesFilter<"User"> | number
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    timezone?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    countryCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneVerified?: BoolWithAggregatesFilter<"User"> | boolean
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    appleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    facebookId?: StringNullableWithAggregatesFilter<"User"> | string | null
    twitterId?: StringNullableWithAggregatesFilter<"User"> | string | null
    hasCompletedOnboarding?: BoolWithAggregatesFilter<"User"> | boolean
    onboardingCompletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    profileCompleteness?: IntWithAggregatesFilter<"User"> | number
    serviceProviderExperienceLevel?: EnumExperienceLevelNullableWithAggregatesFilter<"User"> | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolWithAggregatesFilter<"User"> | boolean
    serviceProviderVerifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isPremium?: BoolWithAggregatesFilter<"User"> | boolean
    subscriptionStatus?: EnumSubscriptionStatusNullableWithAggregatesFilter<"User"> | $Enums.SubscriptionStatus | null
    subscriptionTier?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionStartDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    subscriptionEndDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    themePreference?: EnumThemePreferenceWithAggregatesFilter<"User"> | $Enums.ThemePreference
    notificationsEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    marketingNotifications?: BoolWithAggregatesFilter<"User"> | boolean
    preferredLanguage?: StringWithAggregatesFilter<"User"> | string
    isProfilePublic?: BoolWithAggregatesFilter<"User"> | boolean
    dataAnalyticsEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastActiveAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserAddressWhereInput = {
    AND?: UserAddressWhereInput | UserAddressWhereInput[]
    OR?: UserAddressWhereInput[]
    NOT?: UserAddressWhereInput | UserAddressWhereInput[]
    id?: StringFilter<"UserAddress"> | string
    createdAt?: DateTimeFilter<"UserAddress"> | Date | string
    updatedAt?: DateTimeFilter<"UserAddress"> | Date | string
    userId?: StringFilter<"UserAddress"> | string
    placeId?: StringNullableFilter<"UserAddress"> | string | null
    addressName?: StringFilter<"UserAddress"> | string
    formattedAddress?: StringFilter<"UserAddress"> | string
    latitude?: FloatFilter<"UserAddress"> | number
    longitude?: FloatFilter<"UserAddress"> | number
    city?: StringNullableFilter<"UserAddress"> | string | null
    state?: StringNullableFilter<"UserAddress"> | string | null
    country?: StringNullableFilter<"UserAddress"> | string | null
    postalCode?: StringNullableFilter<"UserAddress"> | string | null
    isPrimary?: BoolFilter<"UserAddress"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserAddressOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    placeId?: SortOrderInput | SortOrder
    addressName?: SortOrder
    formattedAddress?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    postalCode?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserAddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserAddressWhereInput | UserAddressWhereInput[]
    OR?: UserAddressWhereInput[]
    NOT?: UserAddressWhereInput | UserAddressWhereInput[]
    createdAt?: DateTimeFilter<"UserAddress"> | Date | string
    updatedAt?: DateTimeFilter<"UserAddress"> | Date | string
    userId?: StringFilter<"UserAddress"> | string
    placeId?: StringNullableFilter<"UserAddress"> | string | null
    addressName?: StringFilter<"UserAddress"> | string
    formattedAddress?: StringFilter<"UserAddress"> | string
    latitude?: FloatFilter<"UserAddress"> | number
    longitude?: FloatFilter<"UserAddress"> | number
    city?: StringNullableFilter<"UserAddress"> | string | null
    state?: StringNullableFilter<"UserAddress"> | string | null
    country?: StringNullableFilter<"UserAddress"> | string | null
    postalCode?: StringNullableFilter<"UserAddress"> | string | null
    isPrimary?: BoolFilter<"UserAddress"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserAddressOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    placeId?: SortOrderInput | SortOrder
    addressName?: SortOrder
    formattedAddress?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    postalCode?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    _count?: UserAddressCountOrderByAggregateInput
    _avg?: UserAddressAvgOrderByAggregateInput
    _max?: UserAddressMaxOrderByAggregateInput
    _min?: UserAddressMinOrderByAggregateInput
    _sum?: UserAddressSumOrderByAggregateInput
  }

  export type UserAddressScalarWhereWithAggregatesInput = {
    AND?: UserAddressScalarWhereWithAggregatesInput | UserAddressScalarWhereWithAggregatesInput[]
    OR?: UserAddressScalarWhereWithAggregatesInput[]
    NOT?: UserAddressScalarWhereWithAggregatesInput | UserAddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAddress"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserAddress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserAddress"> | Date | string
    userId?: StringWithAggregatesFilter<"UserAddress"> | string
    placeId?: StringNullableWithAggregatesFilter<"UserAddress"> | string | null
    addressName?: StringWithAggregatesFilter<"UserAddress"> | string
    formattedAddress?: StringWithAggregatesFilter<"UserAddress"> | string
    latitude?: FloatWithAggregatesFilter<"UserAddress"> | number
    longitude?: FloatWithAggregatesFilter<"UserAddress"> | number
    city?: StringNullableWithAggregatesFilter<"UserAddress"> | string | null
    state?: StringNullableWithAggregatesFilter<"UserAddress"> | string | null
    country?: StringNullableWithAggregatesFilter<"UserAddress"> | string | null
    postalCode?: StringNullableWithAggregatesFilter<"UserAddress"> | string | null
    isPrimary?: BoolWithAggregatesFilter<"UserAddress"> | boolean
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    isActive?: BoolFilter<"Category"> | boolean
    userInterests?: UserInterestListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    userInterests?: UserInterestOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    description?: StringNullableFilter<"Category"> | string | null
    isActive?: BoolFilter<"Category"> | boolean
    userInterests?: UserInterestListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    name?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    isActive?: BoolWithAggregatesFilter<"Category"> | boolean
  }

  export type UserInterestWhereInput = {
    AND?: UserInterestWhereInput | UserInterestWhereInput[]
    OR?: UserInterestWhereInput[]
    NOT?: UserInterestWhereInput | UserInterestWhereInput[]
    id?: StringFilter<"UserInterest"> | string
    createdAt?: DateTimeFilter<"UserInterest"> | Date | string
    userId?: StringFilter<"UserInterest"> | string
    categoryId?: StringFilter<"UserInterest"> | string
    type?: EnumUserInterestTypeFilter<"UserInterest"> | $Enums.UserInterestType
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type UserInterestOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    type?: SortOrder
    user?: UserOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type UserInterestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_categoryId_type?: UserInterestUserIdCategoryIdTypeCompoundUniqueInput
    AND?: UserInterestWhereInput | UserInterestWhereInput[]
    OR?: UserInterestWhereInput[]
    NOT?: UserInterestWhereInput | UserInterestWhereInput[]
    createdAt?: DateTimeFilter<"UserInterest"> | Date | string
    userId?: StringFilter<"UserInterest"> | string
    categoryId?: StringFilter<"UserInterest"> | string
    type?: EnumUserInterestTypeFilter<"UserInterest"> | $Enums.UserInterestType
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id" | "userId_categoryId_type">

  export type UserInterestOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    type?: SortOrder
    _count?: UserInterestCountOrderByAggregateInput
    _max?: UserInterestMaxOrderByAggregateInput
    _min?: UserInterestMinOrderByAggregateInput
  }

  export type UserInterestScalarWhereWithAggregatesInput = {
    AND?: UserInterestScalarWhereWithAggregatesInput | UserInterestScalarWhereWithAggregatesInput[]
    OR?: UserInterestScalarWhereWithAggregatesInput[]
    NOT?: UserInterestScalarWhereWithAggregatesInput | UserInterestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserInterest"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserInterest"> | Date | string
    userId?: StringWithAggregatesFilter<"UserInterest"> | string
    categoryId?: StringWithAggregatesFilter<"UserInterest"> | string
    type?: EnumUserInterestTypeWithAggregatesFilter<"UserInterest"> | $Enums.UserInterestType
  }

  export type VerificationDocumentWhereInput = {
    AND?: VerificationDocumentWhereInput | VerificationDocumentWhereInput[]
    OR?: VerificationDocumentWhereInput[]
    NOT?: VerificationDocumentWhereInput | VerificationDocumentWhereInput[]
    id?: StringFilter<"VerificationDocument"> | string
    createdAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    updatedAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    userId?: StringFilter<"VerificationDocument"> | string
    fileName?: StringFilter<"VerificationDocument"> | string
    originalName?: StringFilter<"VerificationDocument"> | string
    fileUrl?: StringFilter<"VerificationDocument"> | string
    fileType?: StringFilter<"VerificationDocument"> | string
    fileSize?: IntFilter<"VerificationDocument"> | number
    documentType?: EnumDocumentTypeFilter<"VerificationDocument"> | $Enums.DocumentType
    status?: EnumDocumentStatusFilter<"VerificationDocument"> | $Enums.DocumentStatus
    reviewNotes?: StringNullableFilter<"VerificationDocument"> | string | null
    uploadedAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"VerificationDocument"> | Date | string | null
    reviewedBy?: StringNullableFilter<"VerificationDocument"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VerificationDocumentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    documentType?: SortOrder
    status?: SortOrder
    reviewNotes?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type VerificationDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationDocumentWhereInput | VerificationDocumentWhereInput[]
    OR?: VerificationDocumentWhereInput[]
    NOT?: VerificationDocumentWhereInput | VerificationDocumentWhereInput[]
    createdAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    updatedAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    userId?: StringFilter<"VerificationDocument"> | string
    fileName?: StringFilter<"VerificationDocument"> | string
    originalName?: StringFilter<"VerificationDocument"> | string
    fileUrl?: StringFilter<"VerificationDocument"> | string
    fileType?: StringFilter<"VerificationDocument"> | string
    fileSize?: IntFilter<"VerificationDocument"> | number
    documentType?: EnumDocumentTypeFilter<"VerificationDocument"> | $Enums.DocumentType
    status?: EnumDocumentStatusFilter<"VerificationDocument"> | $Enums.DocumentStatus
    reviewNotes?: StringNullableFilter<"VerificationDocument"> | string | null
    uploadedAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"VerificationDocument"> | Date | string | null
    reviewedBy?: StringNullableFilter<"VerificationDocument"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type VerificationDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    documentType?: SortOrder
    status?: SortOrder
    reviewNotes?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    _count?: VerificationDocumentCountOrderByAggregateInput
    _avg?: VerificationDocumentAvgOrderByAggregateInput
    _max?: VerificationDocumentMaxOrderByAggregateInput
    _min?: VerificationDocumentMinOrderByAggregateInput
    _sum?: VerificationDocumentSumOrderByAggregateInput
  }

  export type VerificationDocumentScalarWhereWithAggregatesInput = {
    AND?: VerificationDocumentScalarWhereWithAggregatesInput | VerificationDocumentScalarWhereWithAggregatesInput[]
    OR?: VerificationDocumentScalarWhereWithAggregatesInput[]
    NOT?: VerificationDocumentScalarWhereWithAggregatesInput | VerificationDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationDocument"> | string
    createdAt?: DateTimeWithAggregatesFilter<"VerificationDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VerificationDocument"> | Date | string
    userId?: StringWithAggregatesFilter<"VerificationDocument"> | string
    fileName?: StringWithAggregatesFilter<"VerificationDocument"> | string
    originalName?: StringWithAggregatesFilter<"VerificationDocument"> | string
    fileUrl?: StringWithAggregatesFilter<"VerificationDocument"> | string
    fileType?: StringWithAggregatesFilter<"VerificationDocument"> | string
    fileSize?: IntWithAggregatesFilter<"VerificationDocument"> | number
    documentType?: EnumDocumentTypeWithAggregatesFilter<"VerificationDocument"> | $Enums.DocumentType
    status?: EnumDocumentStatusWithAggregatesFilter<"VerificationDocument"> | $Enums.DocumentStatus
    reviewNotes?: StringNullableWithAggregatesFilter<"VerificationDocument"> | string | null
    uploadedAt?: DateTimeWithAggregatesFilter<"VerificationDocument"> | Date | string
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"VerificationDocument"> | Date | string | null
    reviewedBy?: StringNullableWithAggregatesFilter<"VerificationDocument"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
    addresses?: UserAddressCreateNestedManyWithoutUserInput
    interests?: UserInterestCreateNestedManyWithoutUserInput
    verificationDocuments?: VerificationDocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
    addresses?: UserAddressUncheckedCreateNestedManyWithoutUserInput
    interests?: UserInterestUncheckedCreateNestedManyWithoutUserInput
    verificationDocuments?: VerificationDocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: UserAddressUpdateManyWithoutUserNestedInput
    interests?: UserInterestUpdateManyWithoutUserNestedInput
    verificationDocuments?: VerificationDocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: UserAddressUncheckedUpdateManyWithoutUserNestedInput
    interests?: UserInterestUncheckedUpdateManyWithoutUserNestedInput
    verificationDocuments?: VerificationDocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAddressCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    placeId?: string | null
    addressName: string
    formattedAddress: string
    latitude: number
    longitude: number
    city?: string | null
    state?: string | null
    country?: string | null
    postalCode?: string | null
    isPrimary?: boolean
    user: UserCreateNestedOneWithoutAddressesInput
  }

  export type UserAddressUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    placeId?: string | null
    addressName: string
    formattedAddress: string
    latitude: number
    longitude: number
    city?: string | null
    state?: string | null
    country?: string | null
    postalCode?: string | null
    isPrimary?: boolean
  }

  export type UserAddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: StringFieldUpdateOperationsInput | string
    formattedAddress?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type UserAddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: StringFieldUpdateOperationsInput | string
    formattedAddress?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAddressCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    placeId?: string | null
    addressName: string
    formattedAddress: string
    latitude: number
    longitude: number
    city?: string | null
    state?: string | null
    country?: string | null
    postalCode?: string | null
    isPrimary?: boolean
  }

  export type UserAddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: StringFieldUpdateOperationsInput | string
    formattedAddress?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: StringFieldUpdateOperationsInput | string
    formattedAddress?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    isActive?: boolean
    userInterests?: UserInterestCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    isActive?: boolean
    userInterests?: UserInterestUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userInterests?: UserInterestUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userInterests?: UserInterestUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    isActive?: boolean
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserInterestCreateInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.UserInterestType
    user: UserCreateNestedOneWithoutInterestsInput
    category: CategoryCreateNestedOneWithoutUserInterestsInput
  }

  export type UserInterestUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    categoryId: string
    type: $Enums.UserInterestType
  }

  export type UserInterestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
    user?: UserUpdateOneRequiredWithoutInterestsNestedInput
    category?: CategoryUpdateOneRequiredWithoutUserInterestsNestedInput
  }

  export type UserInterestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
  }

  export type UserInterestCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    categoryId: string
    type: $Enums.UserInterestType
  }

  export type UserInterestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
  }

  export type UserInterestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
  }

  export type VerificationDocumentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fileName: string
    originalName: string
    fileUrl: string
    fileType: string
    fileSize: number
    documentType: $Enums.DocumentType
    status?: $Enums.DocumentStatus
    reviewNotes?: string | null
    uploadedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
    user: UserCreateNestedOneWithoutVerificationDocumentsInput
  }

  export type VerificationDocumentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    fileName: string
    originalName: string
    fileUrl: string
    fileType: string
    fileSize: number
    documentType: $Enums.DocumentType
    status?: $Enums.DocumentStatus
    reviewNotes?: string | null
    uploadedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
  }

  export type VerificationDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutVerificationDocumentsNestedInput
  }

  export type VerificationDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationDocumentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    fileName: string
    originalName: string
    fileUrl: string
    fileType: string
    fileSize: number
    documentType: $Enums.DocumentType
    status?: $Enums.DocumentStatus
    reviewNotes?: string | null
    uploadedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
  }

  export type VerificationDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumExperienceLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceLevel | EnumExperienceLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExperienceLevelNullableFilter<$PrismaModel> | $Enums.ExperienceLevel | null
  }

  export type EnumSubscriptionStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubscriptionStatusNullableFilter<$PrismaModel> | $Enums.SubscriptionStatus | null
  }

  export type EnumThemePreferenceFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemePreference | EnumThemePreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.ThemePreference[] | ListEnumThemePreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ThemePreference[] | ListEnumThemePreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumThemePreferenceFilter<$PrismaModel> | $Enums.ThemePreference
  }

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type UserAddressListRelationFilter = {
    every?: UserAddressWhereInput
    some?: UserAddressWhereInput
    none?: UserAddressWhereInput
  }

  export type UserInterestListRelationFilter = {
    every?: UserInterestWhereInput
    some?: UserInterestWhereInput
    none?: UserInterestWhereInput
  }

  export type VerificationDocumentListRelationFilter = {
    every?: VerificationDocumentWhereInput
    some?: VerificationDocumentWhereInput
    none?: VerificationDocumentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserAddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserInterestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VerificationDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrder
    passwordResetOtp?: SortOrder
    passwordResetExpires?: SortOrder
    passwordResetAttempts?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    displayName?: SortOrder
    username?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    dateOfBirth?: SortOrder
    timezone?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    phoneVerified?: SortOrder
    googleId?: SortOrder
    appleId?: SortOrder
    facebookId?: SortOrder
    twitterId?: SortOrder
    hasCompletedOnboarding?: SortOrder
    onboardingCompletedAt?: SortOrder
    profileCompleteness?: SortOrder
    serviceProviderExperienceLevel?: SortOrder
    isServiceProviderVerified?: SortOrder
    serviceProviderVerifiedAt?: SortOrder
    isPremium?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionTier?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionEndDate?: SortOrder
    themePreference?: SortOrder
    notificationsEnabled?: SortOrder
    marketingNotifications?: SortOrder
    preferredLanguage?: SortOrder
    isProfilePublic?: SortOrder
    dataAnalyticsEnabled?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrder
    lastActiveAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    passwordResetAttempts?: SortOrder
    profileCompleteness?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrder
    passwordResetOtp?: SortOrder
    passwordResetExpires?: SortOrder
    passwordResetAttempts?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    displayName?: SortOrder
    username?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    dateOfBirth?: SortOrder
    timezone?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    phoneVerified?: SortOrder
    googleId?: SortOrder
    appleId?: SortOrder
    facebookId?: SortOrder
    twitterId?: SortOrder
    hasCompletedOnboarding?: SortOrder
    onboardingCompletedAt?: SortOrder
    profileCompleteness?: SortOrder
    serviceProviderExperienceLevel?: SortOrder
    isServiceProviderVerified?: SortOrder
    serviceProviderVerifiedAt?: SortOrder
    isPremium?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionTier?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionEndDate?: SortOrder
    themePreference?: SortOrder
    notificationsEnabled?: SortOrder
    marketingNotifications?: SortOrder
    preferredLanguage?: SortOrder
    isProfilePublic?: SortOrder
    dataAnalyticsEnabled?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrder
    lastActiveAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    password?: SortOrder
    passwordResetOtp?: SortOrder
    passwordResetExpires?: SortOrder
    passwordResetAttempts?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    displayName?: SortOrder
    username?: SortOrder
    avatar?: SortOrder
    bio?: SortOrder
    dateOfBirth?: SortOrder
    timezone?: SortOrder
    phoneNumber?: SortOrder
    countryCode?: SortOrder
    phoneVerified?: SortOrder
    googleId?: SortOrder
    appleId?: SortOrder
    facebookId?: SortOrder
    twitterId?: SortOrder
    hasCompletedOnboarding?: SortOrder
    onboardingCompletedAt?: SortOrder
    profileCompleteness?: SortOrder
    serviceProviderExperienceLevel?: SortOrder
    isServiceProviderVerified?: SortOrder
    serviceProviderVerifiedAt?: SortOrder
    isPremium?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionTier?: SortOrder
    subscriptionStartDate?: SortOrder
    subscriptionEndDate?: SortOrder
    themePreference?: SortOrder
    notificationsEnabled?: SortOrder
    marketingNotifications?: SortOrder
    preferredLanguage?: SortOrder
    isProfilePublic?: SortOrder
    dataAnalyticsEnabled?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrder
    lastActiveAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    passwordResetAttempts?: SortOrder
    profileCompleteness?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumExperienceLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceLevel | EnumExperienceLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExperienceLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumExperienceLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumExperienceLevelNullableFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubscriptionStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusNullableFilter<$PrismaModel>
  }

  export type EnumThemePreferenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemePreference | EnumThemePreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.ThemePreference[] | ListEnumThemePreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ThemePreference[] | ListEnumThemePreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumThemePreferenceWithAggregatesFilter<$PrismaModel> | $Enums.ThemePreference
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumThemePreferenceFilter<$PrismaModel>
    _max?: NestedEnumThemePreferenceFilter<$PrismaModel>
  }

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserAddressCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    placeId?: SortOrder
    addressName?: SortOrder
    formattedAddress?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    isPrimary?: SortOrder
  }

  export type UserAddressAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type UserAddressMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    placeId?: SortOrder
    addressName?: SortOrder
    formattedAddress?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    isPrimary?: SortOrder
  }

  export type UserAddressMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    placeId?: SortOrder
    addressName?: SortOrder
    formattedAddress?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    isPrimary?: SortOrder
  }

  export type UserAddressSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
  }

  export type EnumUserInterestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserInterestType | EnumUserInterestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserInterestType[] | ListEnumUserInterestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserInterestType[] | ListEnumUserInterestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserInterestTypeFilter<$PrismaModel> | $Enums.UserInterestType
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type UserInterestUserIdCategoryIdTypeCompoundUniqueInput = {
    userId: string
    categoryId: string
    type: $Enums.UserInterestType
  }

  export type UserInterestCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    type?: SortOrder
  }

  export type UserInterestMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    type?: SortOrder
  }

  export type UserInterestMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    type?: SortOrder
  }

  export type EnumUserInterestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserInterestType | EnumUserInterestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserInterestType[] | ListEnumUserInterestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserInterestType[] | ListEnumUserInterestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserInterestTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserInterestType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserInterestTypeFilter<$PrismaModel>
    _max?: NestedEnumUserInterestTypeFilter<$PrismaModel>
  }

  export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type EnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type VerificationDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    documentType?: SortOrder
    status?: SortOrder
    reviewNotes?: SortOrder
    uploadedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
  }

  export type VerificationDocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type VerificationDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    documentType?: SortOrder
    status?: SortOrder
    reviewNotes?: SortOrder
    uploadedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
  }

  export type VerificationDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    originalName?: SortOrder
    fileUrl?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    documentType?: SortOrder
    status?: SortOrder
    reviewNotes?: SortOrder
    uploadedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
  }

  export type VerificationDocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type EnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type UserAddressCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAddressCreateWithoutUserInput, UserAddressUncheckedCreateWithoutUserInput> | UserAddressCreateWithoutUserInput[] | UserAddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAddressCreateOrConnectWithoutUserInput | UserAddressCreateOrConnectWithoutUserInput[]
    createMany?: UserAddressCreateManyUserInputEnvelope
    connect?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
  }

  export type UserInterestCreateNestedManyWithoutUserInput = {
    create?: XOR<UserInterestCreateWithoutUserInput, UserInterestUncheckedCreateWithoutUserInput> | UserInterestCreateWithoutUserInput[] | UserInterestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutUserInput | UserInterestCreateOrConnectWithoutUserInput[]
    createMany?: UserInterestCreateManyUserInputEnvelope
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
  }

  export type VerificationDocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput> | VerificationDocumentCreateWithoutUserInput[] | VerificationDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput | VerificationDocumentCreateOrConnectWithoutUserInput[]
    createMany?: VerificationDocumentCreateManyUserInputEnvelope
    connect?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
  }

  export type UserAddressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAddressCreateWithoutUserInput, UserAddressUncheckedCreateWithoutUserInput> | UserAddressCreateWithoutUserInput[] | UserAddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAddressCreateOrConnectWithoutUserInput | UserAddressCreateOrConnectWithoutUserInput[]
    createMany?: UserAddressCreateManyUserInputEnvelope
    connect?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
  }

  export type UserInterestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserInterestCreateWithoutUserInput, UserInterestUncheckedCreateWithoutUserInput> | UserInterestCreateWithoutUserInput[] | UserInterestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutUserInput | UserInterestCreateOrConnectWithoutUserInput[]
    createMany?: UserInterestCreateManyUserInputEnvelope
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
  }

  export type VerificationDocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput> | VerificationDocumentCreateWithoutUserInput[] | VerificationDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput | VerificationDocumentCreateOrConnectWithoutUserInput[]
    createMany?: VerificationDocumentCreateManyUserInputEnvelope
    connect?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableEnumExperienceLevelFieldUpdateOperationsInput = {
    set?: $Enums.ExperienceLevel | null
  }

  export type NullableEnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus | null
  }

  export type EnumThemePreferenceFieldUpdateOperationsInput = {
    set?: $Enums.ThemePreference
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type UserAddressUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAddressCreateWithoutUserInput, UserAddressUncheckedCreateWithoutUserInput> | UserAddressCreateWithoutUserInput[] | UserAddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAddressCreateOrConnectWithoutUserInput | UserAddressCreateOrConnectWithoutUserInput[]
    upsert?: UserAddressUpsertWithWhereUniqueWithoutUserInput | UserAddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAddressCreateManyUserInputEnvelope
    set?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
    disconnect?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
    delete?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
    connect?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
    update?: UserAddressUpdateWithWhereUniqueWithoutUserInput | UserAddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAddressUpdateManyWithWhereWithoutUserInput | UserAddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAddressScalarWhereInput | UserAddressScalarWhereInput[]
  }

  export type UserInterestUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserInterestCreateWithoutUserInput, UserInterestUncheckedCreateWithoutUserInput> | UserInterestCreateWithoutUserInput[] | UserInterestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutUserInput | UserInterestCreateOrConnectWithoutUserInput[]
    upsert?: UserInterestUpsertWithWhereUniqueWithoutUserInput | UserInterestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserInterestCreateManyUserInputEnvelope
    set?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    disconnect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    delete?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    update?: UserInterestUpdateWithWhereUniqueWithoutUserInput | UserInterestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserInterestUpdateManyWithWhereWithoutUserInput | UserInterestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserInterestScalarWhereInput | UserInterestScalarWhereInput[]
  }

  export type VerificationDocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput> | VerificationDocumentCreateWithoutUserInput[] | VerificationDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput | VerificationDocumentCreateOrConnectWithoutUserInput[]
    upsert?: VerificationDocumentUpsertWithWhereUniqueWithoutUserInput | VerificationDocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VerificationDocumentCreateManyUserInputEnvelope
    set?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
    disconnect?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
    delete?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
    connect?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
    update?: VerificationDocumentUpdateWithWhereUniqueWithoutUserInput | VerificationDocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VerificationDocumentUpdateManyWithWhereWithoutUserInput | VerificationDocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VerificationDocumentScalarWhereInput | VerificationDocumentScalarWhereInput[]
  }

  export type UserAddressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAddressCreateWithoutUserInput, UserAddressUncheckedCreateWithoutUserInput> | UserAddressCreateWithoutUserInput[] | UserAddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAddressCreateOrConnectWithoutUserInput | UserAddressCreateOrConnectWithoutUserInput[]
    upsert?: UserAddressUpsertWithWhereUniqueWithoutUserInput | UserAddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAddressCreateManyUserInputEnvelope
    set?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
    disconnect?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
    delete?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
    connect?: UserAddressWhereUniqueInput | UserAddressWhereUniqueInput[]
    update?: UserAddressUpdateWithWhereUniqueWithoutUserInput | UserAddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAddressUpdateManyWithWhereWithoutUserInput | UserAddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAddressScalarWhereInput | UserAddressScalarWhereInput[]
  }

  export type UserInterestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserInterestCreateWithoutUserInput, UserInterestUncheckedCreateWithoutUserInput> | UserInterestCreateWithoutUserInput[] | UserInterestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutUserInput | UserInterestCreateOrConnectWithoutUserInput[]
    upsert?: UserInterestUpsertWithWhereUniqueWithoutUserInput | UserInterestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserInterestCreateManyUserInputEnvelope
    set?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    disconnect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    delete?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    update?: UserInterestUpdateWithWhereUniqueWithoutUserInput | UserInterestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserInterestUpdateManyWithWhereWithoutUserInput | UserInterestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserInterestScalarWhereInput | UserInterestScalarWhereInput[]
  }

  export type VerificationDocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput> | VerificationDocumentCreateWithoutUserInput[] | VerificationDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VerificationDocumentCreateOrConnectWithoutUserInput | VerificationDocumentCreateOrConnectWithoutUserInput[]
    upsert?: VerificationDocumentUpsertWithWhereUniqueWithoutUserInput | VerificationDocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VerificationDocumentCreateManyUserInputEnvelope
    set?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
    disconnect?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
    delete?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
    connect?: VerificationDocumentWhereUniqueInput | VerificationDocumentWhereUniqueInput[]
    update?: VerificationDocumentUpdateWithWhereUniqueWithoutUserInput | VerificationDocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VerificationDocumentUpdateManyWithWhereWithoutUserInput | VerificationDocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VerificationDocumentScalarWhereInput | VerificationDocumentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAddressesInput = {
    create?: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput
    upsert?: UserUpsertWithoutAddressesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAddressesInput, UserUpdateWithoutAddressesInput>, UserUncheckedUpdateWithoutAddressesInput>
  }

  export type UserInterestCreateNestedManyWithoutCategoryInput = {
    create?: XOR<UserInterestCreateWithoutCategoryInput, UserInterestUncheckedCreateWithoutCategoryInput> | UserInterestCreateWithoutCategoryInput[] | UserInterestUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutCategoryInput | UserInterestCreateOrConnectWithoutCategoryInput[]
    createMany?: UserInterestCreateManyCategoryInputEnvelope
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
  }

  export type UserInterestUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<UserInterestCreateWithoutCategoryInput, UserInterestUncheckedCreateWithoutCategoryInput> | UserInterestCreateWithoutCategoryInput[] | UserInterestUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutCategoryInput | UserInterestCreateOrConnectWithoutCategoryInput[]
    createMany?: UserInterestCreateManyCategoryInputEnvelope
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
  }

  export type UserInterestUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<UserInterestCreateWithoutCategoryInput, UserInterestUncheckedCreateWithoutCategoryInput> | UserInterestCreateWithoutCategoryInput[] | UserInterestUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutCategoryInput | UserInterestCreateOrConnectWithoutCategoryInput[]
    upsert?: UserInterestUpsertWithWhereUniqueWithoutCategoryInput | UserInterestUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: UserInterestCreateManyCategoryInputEnvelope
    set?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    disconnect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    delete?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    update?: UserInterestUpdateWithWhereUniqueWithoutCategoryInput | UserInterestUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: UserInterestUpdateManyWithWhereWithoutCategoryInput | UserInterestUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: UserInterestScalarWhereInput | UserInterestScalarWhereInput[]
  }

  export type UserInterestUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<UserInterestCreateWithoutCategoryInput, UserInterestUncheckedCreateWithoutCategoryInput> | UserInterestCreateWithoutCategoryInput[] | UserInterestUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutCategoryInput | UserInterestCreateOrConnectWithoutCategoryInput[]
    upsert?: UserInterestUpsertWithWhereUniqueWithoutCategoryInput | UserInterestUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: UserInterestCreateManyCategoryInputEnvelope
    set?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    disconnect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    delete?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
    update?: UserInterestUpdateWithWhereUniqueWithoutCategoryInput | UserInterestUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: UserInterestUpdateManyWithWhereWithoutCategoryInput | UserInterestUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: UserInterestScalarWhereInput | UserInterestScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInterestsInput = {
    create?: XOR<UserCreateWithoutInterestsInput, UserUncheckedCreateWithoutInterestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterestsInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutUserInterestsInput = {
    create?: XOR<CategoryCreateWithoutUserInterestsInput, CategoryUncheckedCreateWithoutUserInterestsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInterestsInput
    connect?: CategoryWhereUniqueInput
  }

  export type EnumUserInterestTypeFieldUpdateOperationsInput = {
    set?: $Enums.UserInterestType
  }

  export type UserUpdateOneRequiredWithoutInterestsNestedInput = {
    create?: XOR<UserCreateWithoutInterestsInput, UserUncheckedCreateWithoutInterestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInterestsInput
    upsert?: UserUpsertWithoutInterestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInterestsInput, UserUpdateWithoutInterestsInput>, UserUncheckedUpdateWithoutInterestsInput>
  }

  export type CategoryUpdateOneRequiredWithoutUserInterestsNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInterestsInput, CategoryUncheckedCreateWithoutUserInterestsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInterestsInput
    upsert?: CategoryUpsertWithoutUserInterestsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutUserInterestsInput, CategoryUpdateWithoutUserInterestsInput>, CategoryUncheckedUpdateWithoutUserInterestsInput>
  }

  export type UserCreateNestedOneWithoutVerificationDocumentsInput = {
    create?: XOR<UserCreateWithoutVerificationDocumentsInput, UserUncheckedCreateWithoutVerificationDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType
  }

  export type EnumDocumentStatusFieldUpdateOperationsInput = {
    set?: $Enums.DocumentStatus
  }

  export type UserUpdateOneRequiredWithoutVerificationDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutVerificationDocumentsInput, UserUncheckedCreateWithoutVerificationDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerificationDocumentsInput
    upsert?: UserUpsertWithoutVerificationDocumentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerificationDocumentsInput, UserUpdateWithoutVerificationDocumentsInput>, UserUncheckedUpdateWithoutVerificationDocumentsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumExperienceLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceLevel | EnumExperienceLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExperienceLevelNullableFilter<$PrismaModel> | $Enums.ExperienceLevel | null
  }

  export type NestedEnumSubscriptionStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubscriptionStatusNullableFilter<$PrismaModel> | $Enums.SubscriptionStatus | null
  }

  export type NestedEnumThemePreferenceFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemePreference | EnumThemePreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.ThemePreference[] | ListEnumThemePreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ThemePreference[] | ListEnumThemePreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumThemePreferenceFilter<$PrismaModel> | $Enums.ThemePreference
  }

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumExperienceLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceLevel | EnumExperienceLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExperienceLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumExperienceLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumExperienceLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSubscriptionStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumThemePreferenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ThemePreference | EnumThemePreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.ThemePreference[] | ListEnumThemePreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ThemePreference[] | ListEnumThemePreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumThemePreferenceWithAggregatesFilter<$PrismaModel> | $Enums.ThemePreference
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumThemePreferenceFilter<$PrismaModel>
    _max?: NestedEnumThemePreferenceFilter<$PrismaModel>
  }

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumUserInterestTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UserInterestType | EnumUserInterestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserInterestType[] | ListEnumUserInterestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserInterestType[] | ListEnumUserInterestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserInterestTypeFilter<$PrismaModel> | $Enums.UserInterestType
  }

  export type NestedEnumUserInterestTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserInterestType | EnumUserInterestTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UserInterestType[] | ListEnumUserInterestTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserInterestType[] | ListEnumUserInterestTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUserInterestTypeWithAggregatesFilter<$PrismaModel> | $Enums.UserInterestType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserInterestTypeFilter<$PrismaModel>
    _max?: NestedEnumUserInterestTypeFilter<$PrismaModel>
  }

  export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType
  }

  export type NestedEnumDocumentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusFilter<$PrismaModel> | $Enums.DocumentStatus
  }

  export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | EnumDocumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentType[] | ListEnumDocumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentTypeFilter<$PrismaModel>
    _max?: NestedEnumDocumentTypeFilter<$PrismaModel>
  }

  export type NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentStatus | EnumDocumentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentStatus[] | ListEnumDocumentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentStatusFilter<$PrismaModel>
    _max?: NestedEnumDocumentStatusFilter<$PrismaModel>
  }

  export type UserAddressCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    placeId?: string | null
    addressName: string
    formattedAddress: string
    latitude: number
    longitude: number
    city?: string | null
    state?: string | null
    country?: string | null
    postalCode?: string | null
    isPrimary?: boolean
  }

  export type UserAddressUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    placeId?: string | null
    addressName: string
    formattedAddress: string
    latitude: number
    longitude: number
    city?: string | null
    state?: string | null
    country?: string | null
    postalCode?: string | null
    isPrimary?: boolean
  }

  export type UserAddressCreateOrConnectWithoutUserInput = {
    where: UserAddressWhereUniqueInput
    create: XOR<UserAddressCreateWithoutUserInput, UserAddressUncheckedCreateWithoutUserInput>
  }

  export type UserAddressCreateManyUserInputEnvelope = {
    data: UserAddressCreateManyUserInput | UserAddressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserInterestCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.UserInterestType
    category: CategoryCreateNestedOneWithoutUserInterestsInput
  }

  export type UserInterestUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    categoryId: string
    type: $Enums.UserInterestType
  }

  export type UserInterestCreateOrConnectWithoutUserInput = {
    where: UserInterestWhereUniqueInput
    create: XOR<UserInterestCreateWithoutUserInput, UserInterestUncheckedCreateWithoutUserInput>
  }

  export type UserInterestCreateManyUserInputEnvelope = {
    data: UserInterestCreateManyUserInput | UserInterestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VerificationDocumentCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fileName: string
    originalName: string
    fileUrl: string
    fileType: string
    fileSize: number
    documentType: $Enums.DocumentType
    status?: $Enums.DocumentStatus
    reviewNotes?: string | null
    uploadedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
  }

  export type VerificationDocumentUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fileName: string
    originalName: string
    fileUrl: string
    fileType: string
    fileSize: number
    documentType: $Enums.DocumentType
    status?: $Enums.DocumentStatus
    reviewNotes?: string | null
    uploadedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
  }

  export type VerificationDocumentCreateOrConnectWithoutUserInput = {
    where: VerificationDocumentWhereUniqueInput
    create: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
  }

  export type VerificationDocumentCreateManyUserInputEnvelope = {
    data: VerificationDocumentCreateManyUserInput | VerificationDocumentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserAddressUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAddressWhereUniqueInput
    update: XOR<UserAddressUpdateWithoutUserInput, UserAddressUncheckedUpdateWithoutUserInput>
    create: XOR<UserAddressCreateWithoutUserInput, UserAddressUncheckedCreateWithoutUserInput>
  }

  export type UserAddressUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAddressWhereUniqueInput
    data: XOR<UserAddressUpdateWithoutUserInput, UserAddressUncheckedUpdateWithoutUserInput>
  }

  export type UserAddressUpdateManyWithWhereWithoutUserInput = {
    where: UserAddressScalarWhereInput
    data: XOR<UserAddressUpdateManyMutationInput, UserAddressUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAddressScalarWhereInput = {
    AND?: UserAddressScalarWhereInput | UserAddressScalarWhereInput[]
    OR?: UserAddressScalarWhereInput[]
    NOT?: UserAddressScalarWhereInput | UserAddressScalarWhereInput[]
    id?: StringFilter<"UserAddress"> | string
    createdAt?: DateTimeFilter<"UserAddress"> | Date | string
    updatedAt?: DateTimeFilter<"UserAddress"> | Date | string
    userId?: StringFilter<"UserAddress"> | string
    placeId?: StringNullableFilter<"UserAddress"> | string | null
    addressName?: StringFilter<"UserAddress"> | string
    formattedAddress?: StringFilter<"UserAddress"> | string
    latitude?: FloatFilter<"UserAddress"> | number
    longitude?: FloatFilter<"UserAddress"> | number
    city?: StringNullableFilter<"UserAddress"> | string | null
    state?: StringNullableFilter<"UserAddress"> | string | null
    country?: StringNullableFilter<"UserAddress"> | string | null
    postalCode?: StringNullableFilter<"UserAddress"> | string | null
    isPrimary?: BoolFilter<"UserAddress"> | boolean
  }

  export type UserInterestUpsertWithWhereUniqueWithoutUserInput = {
    where: UserInterestWhereUniqueInput
    update: XOR<UserInterestUpdateWithoutUserInput, UserInterestUncheckedUpdateWithoutUserInput>
    create: XOR<UserInterestCreateWithoutUserInput, UserInterestUncheckedCreateWithoutUserInput>
  }

  export type UserInterestUpdateWithWhereUniqueWithoutUserInput = {
    where: UserInterestWhereUniqueInput
    data: XOR<UserInterestUpdateWithoutUserInput, UserInterestUncheckedUpdateWithoutUserInput>
  }

  export type UserInterestUpdateManyWithWhereWithoutUserInput = {
    where: UserInterestScalarWhereInput
    data: XOR<UserInterestUpdateManyMutationInput, UserInterestUncheckedUpdateManyWithoutUserInput>
  }

  export type UserInterestScalarWhereInput = {
    AND?: UserInterestScalarWhereInput | UserInterestScalarWhereInput[]
    OR?: UserInterestScalarWhereInput[]
    NOT?: UserInterestScalarWhereInput | UserInterestScalarWhereInput[]
    id?: StringFilter<"UserInterest"> | string
    createdAt?: DateTimeFilter<"UserInterest"> | Date | string
    userId?: StringFilter<"UserInterest"> | string
    categoryId?: StringFilter<"UserInterest"> | string
    type?: EnumUserInterestTypeFilter<"UserInterest"> | $Enums.UserInterestType
  }

  export type VerificationDocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: VerificationDocumentWhereUniqueInput
    update: XOR<VerificationDocumentUpdateWithoutUserInput, VerificationDocumentUncheckedUpdateWithoutUserInput>
    create: XOR<VerificationDocumentCreateWithoutUserInput, VerificationDocumentUncheckedCreateWithoutUserInput>
  }

  export type VerificationDocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: VerificationDocumentWhereUniqueInput
    data: XOR<VerificationDocumentUpdateWithoutUserInput, VerificationDocumentUncheckedUpdateWithoutUserInput>
  }

  export type VerificationDocumentUpdateManyWithWhereWithoutUserInput = {
    where: VerificationDocumentScalarWhereInput
    data: XOR<VerificationDocumentUpdateManyMutationInput, VerificationDocumentUncheckedUpdateManyWithoutUserInput>
  }

  export type VerificationDocumentScalarWhereInput = {
    AND?: VerificationDocumentScalarWhereInput | VerificationDocumentScalarWhereInput[]
    OR?: VerificationDocumentScalarWhereInput[]
    NOT?: VerificationDocumentScalarWhereInput | VerificationDocumentScalarWhereInput[]
    id?: StringFilter<"VerificationDocument"> | string
    createdAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    updatedAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    userId?: StringFilter<"VerificationDocument"> | string
    fileName?: StringFilter<"VerificationDocument"> | string
    originalName?: StringFilter<"VerificationDocument"> | string
    fileUrl?: StringFilter<"VerificationDocument"> | string
    fileType?: StringFilter<"VerificationDocument"> | string
    fileSize?: IntFilter<"VerificationDocument"> | number
    documentType?: EnumDocumentTypeFilter<"VerificationDocument"> | $Enums.DocumentType
    status?: EnumDocumentStatusFilter<"VerificationDocument"> | $Enums.DocumentStatus
    reviewNotes?: StringNullableFilter<"VerificationDocument"> | string | null
    uploadedAt?: DateTimeFilter<"VerificationDocument"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"VerificationDocument"> | Date | string | null
    reviewedBy?: StringNullableFilter<"VerificationDocument"> | string | null
  }

  export type UserCreateWithoutAddressesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
    interests?: UserInterestCreateNestedManyWithoutUserInput
    verificationDocuments?: VerificationDocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAddressesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
    interests?: UserInterestUncheckedCreateNestedManyWithoutUserInput
    verificationDocuments?: VerificationDocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAddressesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
  }

  export type UserUpsertWithoutAddressesInput = {
    update: XOR<UserUpdateWithoutAddressesInput, UserUncheckedUpdateWithoutAddressesInput>
    create: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAddressesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAddressesInput, UserUncheckedUpdateWithoutAddressesInput>
  }

  export type UserUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interests?: UserInterestUpdateManyWithoutUserNestedInput
    verificationDocuments?: VerificationDocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    interests?: UserInterestUncheckedUpdateManyWithoutUserNestedInput
    verificationDocuments?: VerificationDocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserInterestCreateWithoutCategoryInput = {
    id?: string
    createdAt?: Date | string
    type: $Enums.UserInterestType
    user: UserCreateNestedOneWithoutInterestsInput
  }

  export type UserInterestUncheckedCreateWithoutCategoryInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    type: $Enums.UserInterestType
  }

  export type UserInterestCreateOrConnectWithoutCategoryInput = {
    where: UserInterestWhereUniqueInput
    create: XOR<UserInterestCreateWithoutCategoryInput, UserInterestUncheckedCreateWithoutCategoryInput>
  }

  export type UserInterestCreateManyCategoryInputEnvelope = {
    data: UserInterestCreateManyCategoryInput | UserInterestCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserInterestUpsertWithWhereUniqueWithoutCategoryInput = {
    where: UserInterestWhereUniqueInput
    update: XOR<UserInterestUpdateWithoutCategoryInput, UserInterestUncheckedUpdateWithoutCategoryInput>
    create: XOR<UserInterestCreateWithoutCategoryInput, UserInterestUncheckedCreateWithoutCategoryInput>
  }

  export type UserInterestUpdateWithWhereUniqueWithoutCategoryInput = {
    where: UserInterestWhereUniqueInput
    data: XOR<UserInterestUpdateWithoutCategoryInput, UserInterestUncheckedUpdateWithoutCategoryInput>
  }

  export type UserInterestUpdateManyWithWhereWithoutCategoryInput = {
    where: UserInterestScalarWhereInput
    data: XOR<UserInterestUpdateManyMutationInput, UserInterestUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutInterestsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
    addresses?: UserAddressCreateNestedManyWithoutUserInput
    verificationDocuments?: VerificationDocumentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInterestsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
    addresses?: UserAddressUncheckedCreateNestedManyWithoutUserInput
    verificationDocuments?: VerificationDocumentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInterestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInterestsInput, UserUncheckedCreateWithoutInterestsInput>
  }

  export type CategoryCreateWithoutUserInterestsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    isActive?: boolean
  }

  export type CategoryUncheckedCreateWithoutUserInterestsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    isActive?: boolean
  }

  export type CategoryCreateOrConnectWithoutUserInterestsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutUserInterestsInput, CategoryUncheckedCreateWithoutUserInterestsInput>
  }

  export type UserUpsertWithoutInterestsInput = {
    update: XOR<UserUpdateWithoutInterestsInput, UserUncheckedUpdateWithoutInterestsInput>
    create: XOR<UserCreateWithoutInterestsInput, UserUncheckedCreateWithoutInterestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInterestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInterestsInput, UserUncheckedUpdateWithoutInterestsInput>
  }

  export type UserUpdateWithoutInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: UserAddressUpdateManyWithoutUserNestedInput
    verificationDocuments?: VerificationDocumentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: UserAddressUncheckedUpdateManyWithoutUserNestedInput
    verificationDocuments?: VerificationDocumentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CategoryUpsertWithoutUserInterestsInput = {
    update: XOR<CategoryUpdateWithoutUserInterestsInput, CategoryUncheckedUpdateWithoutUserInterestsInput>
    create: XOR<CategoryCreateWithoutUserInterestsInput, CategoryUncheckedCreateWithoutUserInterestsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutUserInterestsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutUserInterestsInput, CategoryUncheckedUpdateWithoutUserInterestsInput>
  }

  export type CategoryUpdateWithoutUserInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryUncheckedUpdateWithoutUserInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateWithoutVerificationDocumentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
    addresses?: UserAddressCreateNestedManyWithoutUserInput
    interests?: UserInterestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVerificationDocumentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    password?: string | null
    passwordResetOtp?: string | null
    passwordResetExpires?: Date | string | null
    passwordResetAttempts?: number
    role?: $Enums.Role
    firstName?: string | null
    lastName?: string | null
    displayName?: string | null
    username?: string | null
    avatar?: string | null
    bio?: string | null
    dateOfBirth?: Date | string | null
    timezone?: string
    phoneNumber?: string | null
    countryCode?: string | null
    phoneVerified?: boolean
    googleId?: string | null
    appleId?: string | null
    facebookId?: string | null
    twitterId?: string | null
    hasCompletedOnboarding?: boolean
    onboardingCompletedAt?: Date | string | null
    profileCompleteness?: number
    serviceProviderExperienceLevel?: $Enums.ExperienceLevel | null
    isServiceProviderVerified?: boolean
    serviceProviderVerifiedAt?: Date | string | null
    isPremium?: boolean
    subscriptionStatus?: $Enums.SubscriptionStatus | null
    subscriptionTier?: string | null
    subscriptionStartDate?: Date | string | null
    subscriptionEndDate?: Date | string | null
    themePreference?: $Enums.ThemePreference
    notificationsEnabled?: boolean
    marketingNotifications?: boolean
    preferredLanguage?: string
    isProfilePublic?: boolean
    dataAnalyticsEnabled?: boolean
    status?: $Enums.UserStatus
    lastLoginAt?: Date | string | null
    lastActiveAt?: Date | string
    addresses?: UserAddressUncheckedCreateNestedManyWithoutUserInput
    interests?: UserInterestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVerificationDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerificationDocumentsInput, UserUncheckedCreateWithoutVerificationDocumentsInput>
  }

  export type UserUpsertWithoutVerificationDocumentsInput = {
    update: XOR<UserUpdateWithoutVerificationDocumentsInput, UserUncheckedUpdateWithoutVerificationDocumentsInput>
    create: XOR<UserCreateWithoutVerificationDocumentsInput, UserUncheckedCreateWithoutVerificationDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerificationDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerificationDocumentsInput, UserUncheckedUpdateWithoutVerificationDocumentsInput>
  }

  export type UserUpdateWithoutVerificationDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: UserAddressUpdateManyWithoutUserNestedInput
    interests?: UserInterestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVerificationDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    password?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetOtp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    passwordResetAttempts?: IntFieldUpdateOperationsInput | number
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    appleId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    hasCompletedOnboarding?: BoolFieldUpdateOperationsInput | boolean
    onboardingCompletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileCompleteness?: IntFieldUpdateOperationsInput | number
    serviceProviderExperienceLevel?: NullableEnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel | null
    isServiceProviderVerified?: BoolFieldUpdateOperationsInput | boolean
    serviceProviderVerifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    subscriptionStatus?: NullableEnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus | null
    subscriptionTier?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    themePreference?: EnumThemePreferenceFieldUpdateOperationsInput | $Enums.ThemePreference
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    marketingNotifications?: BoolFieldUpdateOperationsInput | boolean
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    isProfilePublic?: BoolFieldUpdateOperationsInput | boolean
    dataAnalyticsEnabled?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    addresses?: UserAddressUncheckedUpdateManyWithoutUserNestedInput
    interests?: UserInterestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserAddressCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    placeId?: string | null
    addressName: string
    formattedAddress: string
    latitude: number
    longitude: number
    city?: string | null
    state?: string | null
    country?: string | null
    postalCode?: string | null
    isPrimary?: boolean
  }

  export type UserInterestCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    categoryId: string
    type: $Enums.UserInterestType
  }

  export type VerificationDocumentCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    fileName: string
    originalName: string
    fileUrl: string
    fileType: string
    fileSize: number
    documentType: $Enums.DocumentType
    status?: $Enums.DocumentStatus
    reviewNotes?: string | null
    uploadedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
  }

  export type UserAddressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: StringFieldUpdateOperationsInput | string
    formattedAddress?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAddressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: StringFieldUpdateOperationsInput | string
    formattedAddress?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserAddressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    placeId?: NullableStringFieldUpdateOperationsInput | string | null
    addressName?: StringFieldUpdateOperationsInput | string
    formattedAddress?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserInterestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
    category?: CategoryUpdateOneRequiredWithoutUserInterestsNestedInput
  }

  export type UserInterestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
  }

  export type UserInterestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
  }

  export type VerificationDocumentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationDocumentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationDocumentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    documentType?: EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType
    status?: EnumDocumentStatusFieldUpdateOperationsInput | $Enums.DocumentStatus
    reviewNotes?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserInterestCreateManyCategoryInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    type: $Enums.UserInterestType
  }

  export type UserInterestUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
    user?: UserUpdateOneRequiredWithoutInterestsNestedInput
  }

  export type UserInterestUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
  }

  export type UserInterestUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumUserInterestTypeFieldUpdateOperationsInput | $Enums.UserInterestType
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