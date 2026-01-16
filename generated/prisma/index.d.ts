
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
 * Model PhoneVerification
 * 
 */
export type PhoneVerification = $Result.DefaultSelection<Prisma.$PhoneVerificationPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model ServicePlan
 * 
 */
export type ServicePlan = $Result.DefaultSelection<Prisma.$ServicePlanPayload>
/**
 * Model ServiceAddon
 * 
 */
export type ServiceAddon = $Result.DefaultSelection<Prisma.$ServiceAddonPayload>
/**
 * Model ServiceImage
 * 
 */
export type ServiceImage = $Result.DefaultSelection<Prisma.$ServiceImagePayload>

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


export const ServiceStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
  SUSPENDED: 'SUSPENDED'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]

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

export type ServiceStatus = $Enums.ServiceStatus

export const ServiceStatus: typeof $Enums.ServiceStatus

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

  /**
   * `prisma.phoneVerification`: Exposes CRUD operations for the **PhoneVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PhoneVerifications
    * const phoneVerifications = await prisma.phoneVerification.findMany()
    * ```
    */
  get phoneVerification(): Prisma.PhoneVerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.servicePlan`: Exposes CRUD operations for the **ServicePlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServicePlans
    * const servicePlans = await prisma.servicePlan.findMany()
    * ```
    */
  get servicePlan(): Prisma.ServicePlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceAddon`: Exposes CRUD operations for the **ServiceAddon** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceAddons
    * const serviceAddons = await prisma.serviceAddon.findMany()
    * ```
    */
  get serviceAddon(): Prisma.ServiceAddonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceImage`: Exposes CRUD operations for the **ServiceImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceImages
    * const serviceImages = await prisma.serviceImage.findMany()
    * ```
    */
  get serviceImage(): Prisma.ServiceImageDelegate<ExtArgs, ClientOptions>;
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
    VerificationDocument: 'VerificationDocument',
    PhoneVerification: 'PhoneVerification',
    Service: 'Service',
    ServicePlan: 'ServicePlan',
    ServiceAddon: 'ServiceAddon',
    ServiceImage: 'ServiceImage'
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
      modelProps: "user" | "userAddress" | "category" | "userInterest" | "verificationDocument" | "phoneVerification" | "service" | "servicePlan" | "serviceAddon" | "serviceImage"
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
      PhoneVerification: {
        payload: Prisma.$PhoneVerificationPayload<ExtArgs>
        fields: Prisma.PhoneVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PhoneVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PhoneVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>
          }
          findFirst: {
            args: Prisma.PhoneVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PhoneVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>
          }
          findMany: {
            args: Prisma.PhoneVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>[]
          }
          create: {
            args: Prisma.PhoneVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>
          }
          createMany: {
            args: Prisma.PhoneVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PhoneVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>[]
          }
          delete: {
            args: Prisma.PhoneVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>
          }
          update: {
            args: Prisma.PhoneVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>
          }
          deleteMany: {
            args: Prisma.PhoneVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PhoneVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PhoneVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>[]
          }
          upsert: {
            args: Prisma.PhoneVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PhoneVerificationPayload>
          }
          aggregate: {
            args: Prisma.PhoneVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePhoneVerification>
          }
          groupBy: {
            args: Prisma.PhoneVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PhoneVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PhoneVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<PhoneVerificationCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      ServicePlan: {
        payload: Prisma.$ServicePlanPayload<ExtArgs>
        fields: Prisma.ServicePlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServicePlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServicePlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>
          }
          findFirst: {
            args: Prisma.ServicePlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServicePlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>
          }
          findMany: {
            args: Prisma.ServicePlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>[]
          }
          create: {
            args: Prisma.ServicePlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>
          }
          createMany: {
            args: Prisma.ServicePlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServicePlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>[]
          }
          delete: {
            args: Prisma.ServicePlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>
          }
          update: {
            args: Prisma.ServicePlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>
          }
          deleteMany: {
            args: Prisma.ServicePlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServicePlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServicePlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>[]
          }
          upsert: {
            args: Prisma.ServicePlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePlanPayload>
          }
          aggregate: {
            args: Prisma.ServicePlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServicePlan>
          }
          groupBy: {
            args: Prisma.ServicePlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServicePlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServicePlanCountArgs<ExtArgs>
            result: $Utils.Optional<ServicePlanCountAggregateOutputType> | number
          }
        }
      }
      ServiceAddon: {
        payload: Prisma.$ServiceAddonPayload<ExtArgs>
        fields: Prisma.ServiceAddonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceAddonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceAddonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>
          }
          findFirst: {
            args: Prisma.ServiceAddonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceAddonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>
          }
          findMany: {
            args: Prisma.ServiceAddonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>[]
          }
          create: {
            args: Prisma.ServiceAddonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>
          }
          createMany: {
            args: Prisma.ServiceAddonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceAddonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>[]
          }
          delete: {
            args: Prisma.ServiceAddonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>
          }
          update: {
            args: Prisma.ServiceAddonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>
          }
          deleteMany: {
            args: Prisma.ServiceAddonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceAddonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceAddonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>[]
          }
          upsert: {
            args: Prisma.ServiceAddonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceAddonPayload>
          }
          aggregate: {
            args: Prisma.ServiceAddonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceAddon>
          }
          groupBy: {
            args: Prisma.ServiceAddonGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceAddonGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceAddonCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceAddonCountAggregateOutputType> | number
          }
        }
      }
      ServiceImage: {
        payload: Prisma.$ServiceImagePayload<ExtArgs>
        fields: Prisma.ServiceImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>
          }
          findFirst: {
            args: Prisma.ServiceImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>
          }
          findMany: {
            args: Prisma.ServiceImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>[]
          }
          create: {
            args: Prisma.ServiceImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>
          }
          createMany: {
            args: Prisma.ServiceImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>[]
          }
          delete: {
            args: Prisma.ServiceImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>
          }
          update: {
            args: Prisma.ServiceImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>
          }
          deleteMany: {
            args: Prisma.ServiceImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>[]
          }
          upsert: {
            args: Prisma.ServiceImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceImagePayload>
          }
          aggregate: {
            args: Prisma.ServiceImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceImage>
          }
          groupBy: {
            args: Prisma.ServiceImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceImageCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceImageCountAggregateOutputType> | number
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
    phoneVerification?: PhoneVerificationOmit
    service?: ServiceOmit
    servicePlan?: ServicePlanOmit
    serviceAddon?: ServiceAddonOmit
    serviceImage?: ServiceImageOmit
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
    services: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | UserCountOutputTypeCountAddressesArgs
    interests?: boolean | UserCountOutputTypeCountInterestsArgs
    verificationDocuments?: boolean | UserCountOutputTypeCountVerificationDocumentsArgs
    services?: boolean | UserCountOutputTypeCountServicesArgs
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
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    subCategories: number
    userInterests: number
    services: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subCategories?: boolean | CategoryCountOutputTypeCountSubCategoriesArgs
    userInterests?: boolean | CategoryCountOutputTypeCountUserInterestsArgs
    services?: boolean | CategoryCountOutputTypeCountServicesArgs
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
  export type CategoryCountOutputTypeCountSubCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountUserInterestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserInterestWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    plans: number
    addons: number
    images: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    plans?: boolean | ServiceCountOutputTypeCountPlansArgs
    addons?: boolean | ServiceCountOutputTypeCountAddonsArgs
    images?: boolean | ServiceCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServicePlanWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountAddonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceAddonWhereInput
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceImageWhereInput
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
    emailVerificationAttempts: number | null
    passwordResetAttempts: number | null
    profileCompleteness: number | null
  }

  export type UserSumAggregateOutputType = {
    emailVerificationAttempts: number | null
    passwordResetAttempts: number | null
    profileCompleteness: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    emailVerified: boolean | null
    emailVerificationOtp: string | null
    emailVerificationExpires: Date | null
    emailVerificationAttempts: number | null
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
    emailVerificationOtp: string | null
    emailVerificationExpires: Date | null
    emailVerificationAttempts: number | null
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
    emailVerificationOtp: number
    emailVerificationExpires: number
    emailVerificationAttempts: number
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
    emailVerificationAttempts?: true
    passwordResetAttempts?: true
    profileCompleteness?: true
  }

  export type UserSumAggregateInputType = {
    emailVerificationAttempts?: true
    passwordResetAttempts?: true
    profileCompleteness?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    emailVerified?: true
    emailVerificationOtp?: true
    emailVerificationExpires?: true
    emailVerificationAttempts?: true
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
    emailVerificationOtp?: true
    emailVerificationExpires?: true
    emailVerificationAttempts?: true
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
    emailVerificationOtp?: true
    emailVerificationExpires?: true
    emailVerificationAttempts?: true
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
    emailVerificationOtp: string | null
    emailVerificationExpires: Date | null
    emailVerificationAttempts: number
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
    emailVerificationOtp?: boolean
    emailVerificationExpires?: boolean
    emailVerificationAttempts?: boolean
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
    services?: boolean | User$servicesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    emailVerified?: boolean
    emailVerificationOtp?: boolean
    emailVerificationExpires?: boolean
    emailVerificationAttempts?: boolean
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
    emailVerificationOtp?: boolean
    emailVerificationExpires?: boolean
    emailVerificationAttempts?: boolean
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
    emailVerificationOtp?: boolean
    emailVerificationExpires?: boolean
    emailVerificationAttempts?: boolean
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

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "email" | "emailVerified" | "emailVerificationOtp" | "emailVerificationExpires" | "emailVerificationAttempts" | "password" | "passwordResetOtp" | "passwordResetExpires" | "passwordResetAttempts" | "role" | "firstName" | "lastName" | "displayName" | "username" | "avatar" | "bio" | "dateOfBirth" | "timezone" | "phoneNumber" | "countryCode" | "phoneVerified" | "googleId" | "appleId" | "facebookId" | "twitterId" | "hasCompletedOnboarding" | "onboardingCompletedAt" | "profileCompleteness" | "serviceProviderExperienceLevel" | "isServiceProviderVerified" | "serviceProviderVerifiedAt" | "isPremium" | "subscriptionStatus" | "subscriptionTier" | "subscriptionStartDate" | "subscriptionEndDate" | "themePreference" | "notificationsEnabled" | "marketingNotifications" | "preferredLanguage" | "isProfilePublic" | "dataAnalyticsEnabled" | "status" | "lastLoginAt" | "lastActiveAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    addresses?: boolean | User$addressesArgs<ExtArgs>
    interests?: boolean | User$interestsArgs<ExtArgs>
    verificationDocuments?: boolean | User$verificationDocumentsArgs<ExtArgs>
    services?: boolean | User$servicesArgs<ExtArgs>
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
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      email: string
      emailVerified: boolean
      emailVerificationOtp: string | null
      emailVerificationExpires: Date | null
      emailVerificationAttempts: number
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
    services<T extends User$servicesArgs<ExtArgs> = {}>(args?: Subset<T, User$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly emailVerificationOtp: FieldRef<"User", 'String'>
    readonly emailVerificationExpires: FieldRef<"User", 'DateTime'>
    readonly emailVerificationAttempts: FieldRef<"User", 'Int'>
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
   * User.services
   */
  export type User$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
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
    imageUrl: string | null
    isActive: boolean | null
    featured: boolean | null
    parentCategoryId: string | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    description: string | null
    imageUrl: string | null
    isActive: boolean | null
    featured: boolean | null
    parentCategoryId: string | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    description: number
    imageUrl: number
    isActive: number
    featured: number
    parentCategoryId: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    imageUrl?: true
    isActive?: true
    featured?: true
    parentCategoryId?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    imageUrl?: true
    isActive?: true
    featured?: true
    parentCategoryId?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    imageUrl?: true
    isActive?: true
    featured?: true
    parentCategoryId?: true
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
    imageUrl: string | null
    isActive: boolean
    featured: boolean
    parentCategoryId: string | null
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
    imageUrl?: boolean
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: boolean
    parentCategory?: boolean | Category$parentCategoryArgs<ExtArgs>
    subCategories?: boolean | Category$subCategoriesArgs<ExtArgs>
    userInterests?: boolean | Category$userInterestsArgs<ExtArgs>
    services?: boolean | Category$servicesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: boolean
    parentCategory?: boolean | Category$parentCategoryArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: boolean
    parentCategory?: boolean | Category$parentCategoryArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    imageUrl?: boolean
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name" | "description" | "imageUrl" | "isActive" | "featured" | "parentCategoryId", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentCategory?: boolean | Category$parentCategoryArgs<ExtArgs>
    subCategories?: boolean | Category$subCategoriesArgs<ExtArgs>
    userInterests?: boolean | Category$userInterestsArgs<ExtArgs>
    services?: boolean | Category$servicesArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentCategory?: boolean | Category$parentCategoryArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parentCategory?: boolean | Category$parentCategoryArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      parentCategory: Prisma.$CategoryPayload<ExtArgs> | null
      subCategories: Prisma.$CategoryPayload<ExtArgs>[]
      userInterests: Prisma.$UserInterestPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      description: string | null
      imageUrl: string | null
      isActive: boolean
      featured: boolean
      parentCategoryId: string | null
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
    parentCategory<T extends Category$parentCategoryArgs<ExtArgs> = {}>(args?: Subset<T, Category$parentCategoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subCategories<T extends Category$subCategoriesArgs<ExtArgs> = {}>(args?: Subset<T, Category$subCategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userInterests<T extends Category$userInterestsArgs<ExtArgs> = {}>(args?: Subset<T, Category$userInterestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Category$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Category$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly imageUrl: FieldRef<"Category", 'String'>
    readonly isActive: FieldRef<"Category", 'Boolean'>
    readonly featured: FieldRef<"Category", 'Boolean'>
    readonly parentCategoryId: FieldRef<"Category", 'String'>
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
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
   * Category.parentCategory
   */
  export type Category$parentCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: CategoryWhereInput
  }

  /**
   * Category.subCategories
   */
  export type Category$subCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
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
   * Category.services
   */
  export type Category$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
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
   * Model PhoneVerification
   */

  export type AggregatePhoneVerification = {
    _count: PhoneVerificationCountAggregateOutputType | null
    _avg: PhoneVerificationAvgAggregateOutputType | null
    _sum: PhoneVerificationSumAggregateOutputType | null
    _min: PhoneVerificationMinAggregateOutputType | null
    _max: PhoneVerificationMaxAggregateOutputType | null
  }

  export type PhoneVerificationAvgAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
  }

  export type PhoneVerificationSumAggregateOutputType = {
    attempts: number | null
    maxAttempts: number | null
  }

  export type PhoneVerificationMinAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    otpCode: string | null
    attempts: number | null
    maxAttempts: number | null
    expiresAt: Date | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PhoneVerificationMaxAggregateOutputType = {
    id: string | null
    phoneNumber: string | null
    otpCode: string | null
    attempts: number | null
    maxAttempts: number | null
    expiresAt: Date | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PhoneVerificationCountAggregateOutputType = {
    id: number
    phoneNumber: number
    otpCode: number
    attempts: number
    maxAttempts: number
    expiresAt: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PhoneVerificationAvgAggregateInputType = {
    attempts?: true
    maxAttempts?: true
  }

  export type PhoneVerificationSumAggregateInputType = {
    attempts?: true
    maxAttempts?: true
  }

  export type PhoneVerificationMinAggregateInputType = {
    id?: true
    phoneNumber?: true
    otpCode?: true
    attempts?: true
    maxAttempts?: true
    expiresAt?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PhoneVerificationMaxAggregateInputType = {
    id?: true
    phoneNumber?: true
    otpCode?: true
    attempts?: true
    maxAttempts?: true
    expiresAt?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PhoneVerificationCountAggregateInputType = {
    id?: true
    phoneNumber?: true
    otpCode?: true
    attempts?: true
    maxAttempts?: true
    expiresAt?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PhoneVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhoneVerification to aggregate.
     */
    where?: PhoneVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhoneVerifications to fetch.
     */
    orderBy?: PhoneVerificationOrderByWithRelationInput | PhoneVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PhoneVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhoneVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhoneVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PhoneVerifications
    **/
    _count?: true | PhoneVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PhoneVerificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PhoneVerificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PhoneVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PhoneVerificationMaxAggregateInputType
  }

  export type GetPhoneVerificationAggregateType<T extends PhoneVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregatePhoneVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePhoneVerification[P]>
      : GetScalarType<T[P], AggregatePhoneVerification[P]>
  }




  export type PhoneVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PhoneVerificationWhereInput
    orderBy?: PhoneVerificationOrderByWithAggregationInput | PhoneVerificationOrderByWithAggregationInput[]
    by: PhoneVerificationScalarFieldEnum[] | PhoneVerificationScalarFieldEnum
    having?: PhoneVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PhoneVerificationCountAggregateInputType | true
    _avg?: PhoneVerificationAvgAggregateInputType
    _sum?: PhoneVerificationSumAggregateInputType
    _min?: PhoneVerificationMinAggregateInputType
    _max?: PhoneVerificationMaxAggregateInputType
  }

  export type PhoneVerificationGroupByOutputType = {
    id: string
    phoneNumber: string
    otpCode: string
    attempts: number
    maxAttempts: number
    expiresAt: Date
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: PhoneVerificationCountAggregateOutputType | null
    _avg: PhoneVerificationAvgAggregateOutputType | null
    _sum: PhoneVerificationSumAggregateOutputType | null
    _min: PhoneVerificationMinAggregateOutputType | null
    _max: PhoneVerificationMaxAggregateOutputType | null
  }

  type GetPhoneVerificationGroupByPayload<T extends PhoneVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PhoneVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PhoneVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PhoneVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], PhoneVerificationGroupByOutputType[P]>
        }
      >
    >


  export type PhoneVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    otpCode?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    expiresAt?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["phoneVerification"]>

  export type PhoneVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    otpCode?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    expiresAt?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["phoneVerification"]>

  export type PhoneVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    phoneNumber?: boolean
    otpCode?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    expiresAt?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["phoneVerification"]>

  export type PhoneVerificationSelectScalar = {
    id?: boolean
    phoneNumber?: boolean
    otpCode?: boolean
    attempts?: boolean
    maxAttempts?: boolean
    expiresAt?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PhoneVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "phoneNumber" | "otpCode" | "attempts" | "maxAttempts" | "expiresAt" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["phoneVerification"]>

  export type $PhoneVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PhoneVerification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      phoneNumber: string
      otpCode: string
      attempts: number
      maxAttempts: number
      expiresAt: Date
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["phoneVerification"]>
    composites: {}
  }

  type PhoneVerificationGetPayload<S extends boolean | null | undefined | PhoneVerificationDefaultArgs> = $Result.GetResult<Prisma.$PhoneVerificationPayload, S>

  type PhoneVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PhoneVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PhoneVerificationCountAggregateInputType | true
    }

  export interface PhoneVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PhoneVerification'], meta: { name: 'PhoneVerification' } }
    /**
     * Find zero or one PhoneVerification that matches the filter.
     * @param {PhoneVerificationFindUniqueArgs} args - Arguments to find a PhoneVerification
     * @example
     * // Get one PhoneVerification
     * const phoneVerification = await prisma.phoneVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PhoneVerificationFindUniqueArgs>(args: SelectSubset<T, PhoneVerificationFindUniqueArgs<ExtArgs>>): Prisma__PhoneVerificationClient<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PhoneVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PhoneVerificationFindUniqueOrThrowArgs} args - Arguments to find a PhoneVerification
     * @example
     * // Get one PhoneVerification
     * const phoneVerification = await prisma.phoneVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PhoneVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, PhoneVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PhoneVerificationClient<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhoneVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneVerificationFindFirstArgs} args - Arguments to find a PhoneVerification
     * @example
     * // Get one PhoneVerification
     * const phoneVerification = await prisma.phoneVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PhoneVerificationFindFirstArgs>(args?: SelectSubset<T, PhoneVerificationFindFirstArgs<ExtArgs>>): Prisma__PhoneVerificationClient<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PhoneVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneVerificationFindFirstOrThrowArgs} args - Arguments to find a PhoneVerification
     * @example
     * // Get one PhoneVerification
     * const phoneVerification = await prisma.phoneVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PhoneVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, PhoneVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PhoneVerificationClient<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PhoneVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PhoneVerifications
     * const phoneVerifications = await prisma.phoneVerification.findMany()
     * 
     * // Get first 10 PhoneVerifications
     * const phoneVerifications = await prisma.phoneVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const phoneVerificationWithIdOnly = await prisma.phoneVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PhoneVerificationFindManyArgs>(args?: SelectSubset<T, PhoneVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PhoneVerification.
     * @param {PhoneVerificationCreateArgs} args - Arguments to create a PhoneVerification.
     * @example
     * // Create one PhoneVerification
     * const PhoneVerification = await prisma.phoneVerification.create({
     *   data: {
     *     // ... data to create a PhoneVerification
     *   }
     * })
     * 
     */
    create<T extends PhoneVerificationCreateArgs>(args: SelectSubset<T, PhoneVerificationCreateArgs<ExtArgs>>): Prisma__PhoneVerificationClient<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PhoneVerifications.
     * @param {PhoneVerificationCreateManyArgs} args - Arguments to create many PhoneVerifications.
     * @example
     * // Create many PhoneVerifications
     * const phoneVerification = await prisma.phoneVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PhoneVerificationCreateManyArgs>(args?: SelectSubset<T, PhoneVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PhoneVerifications and returns the data saved in the database.
     * @param {PhoneVerificationCreateManyAndReturnArgs} args - Arguments to create many PhoneVerifications.
     * @example
     * // Create many PhoneVerifications
     * const phoneVerification = await prisma.phoneVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PhoneVerifications and only return the `id`
     * const phoneVerificationWithIdOnly = await prisma.phoneVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PhoneVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, PhoneVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PhoneVerification.
     * @param {PhoneVerificationDeleteArgs} args - Arguments to delete one PhoneVerification.
     * @example
     * // Delete one PhoneVerification
     * const PhoneVerification = await prisma.phoneVerification.delete({
     *   where: {
     *     // ... filter to delete one PhoneVerification
     *   }
     * })
     * 
     */
    delete<T extends PhoneVerificationDeleteArgs>(args: SelectSubset<T, PhoneVerificationDeleteArgs<ExtArgs>>): Prisma__PhoneVerificationClient<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PhoneVerification.
     * @param {PhoneVerificationUpdateArgs} args - Arguments to update one PhoneVerification.
     * @example
     * // Update one PhoneVerification
     * const phoneVerification = await prisma.phoneVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PhoneVerificationUpdateArgs>(args: SelectSubset<T, PhoneVerificationUpdateArgs<ExtArgs>>): Prisma__PhoneVerificationClient<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PhoneVerifications.
     * @param {PhoneVerificationDeleteManyArgs} args - Arguments to filter PhoneVerifications to delete.
     * @example
     * // Delete a few PhoneVerifications
     * const { count } = await prisma.phoneVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PhoneVerificationDeleteManyArgs>(args?: SelectSubset<T, PhoneVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhoneVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PhoneVerifications
     * const phoneVerification = await prisma.phoneVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PhoneVerificationUpdateManyArgs>(args: SelectSubset<T, PhoneVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PhoneVerifications and returns the data updated in the database.
     * @param {PhoneVerificationUpdateManyAndReturnArgs} args - Arguments to update many PhoneVerifications.
     * @example
     * // Update many PhoneVerifications
     * const phoneVerification = await prisma.phoneVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PhoneVerifications and only return the `id`
     * const phoneVerificationWithIdOnly = await prisma.phoneVerification.updateManyAndReturn({
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
    updateManyAndReturn<T extends PhoneVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, PhoneVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PhoneVerification.
     * @param {PhoneVerificationUpsertArgs} args - Arguments to update or create a PhoneVerification.
     * @example
     * // Update or create a PhoneVerification
     * const phoneVerification = await prisma.phoneVerification.upsert({
     *   create: {
     *     // ... data to create a PhoneVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PhoneVerification we want to update
     *   }
     * })
     */
    upsert<T extends PhoneVerificationUpsertArgs>(args: SelectSubset<T, PhoneVerificationUpsertArgs<ExtArgs>>): Prisma__PhoneVerificationClient<$Result.GetResult<Prisma.$PhoneVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PhoneVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneVerificationCountArgs} args - Arguments to filter PhoneVerifications to count.
     * @example
     * // Count the number of PhoneVerifications
     * const count = await prisma.phoneVerification.count({
     *   where: {
     *     // ... the filter for the PhoneVerifications we want to count
     *   }
     * })
    **/
    count<T extends PhoneVerificationCountArgs>(
      args?: Subset<T, PhoneVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PhoneVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PhoneVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PhoneVerificationAggregateArgs>(args: Subset<T, PhoneVerificationAggregateArgs>): Prisma.PrismaPromise<GetPhoneVerificationAggregateType<T>>

    /**
     * Group by PhoneVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PhoneVerificationGroupByArgs} args - Group by arguments.
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
      T extends PhoneVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PhoneVerificationGroupByArgs['orderBy'] }
        : { orderBy?: PhoneVerificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PhoneVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhoneVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PhoneVerification model
   */
  readonly fields: PhoneVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PhoneVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PhoneVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PhoneVerification model
   */
  interface PhoneVerificationFieldRefs {
    readonly id: FieldRef<"PhoneVerification", 'String'>
    readonly phoneNumber: FieldRef<"PhoneVerification", 'String'>
    readonly otpCode: FieldRef<"PhoneVerification", 'String'>
    readonly attempts: FieldRef<"PhoneVerification", 'Int'>
    readonly maxAttempts: FieldRef<"PhoneVerification", 'Int'>
    readonly expiresAt: FieldRef<"PhoneVerification", 'DateTime'>
    readonly verified: FieldRef<"PhoneVerification", 'Boolean'>
    readonly createdAt: FieldRef<"PhoneVerification", 'DateTime'>
    readonly updatedAt: FieldRef<"PhoneVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PhoneVerification findUnique
   */
  export type PhoneVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * Filter, which PhoneVerification to fetch.
     */
    where: PhoneVerificationWhereUniqueInput
  }

  /**
   * PhoneVerification findUniqueOrThrow
   */
  export type PhoneVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * Filter, which PhoneVerification to fetch.
     */
    where: PhoneVerificationWhereUniqueInput
  }

  /**
   * PhoneVerification findFirst
   */
  export type PhoneVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * Filter, which PhoneVerification to fetch.
     */
    where?: PhoneVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhoneVerifications to fetch.
     */
    orderBy?: PhoneVerificationOrderByWithRelationInput | PhoneVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhoneVerifications.
     */
    cursor?: PhoneVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhoneVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhoneVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhoneVerifications.
     */
    distinct?: PhoneVerificationScalarFieldEnum | PhoneVerificationScalarFieldEnum[]
  }

  /**
   * PhoneVerification findFirstOrThrow
   */
  export type PhoneVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * Filter, which PhoneVerification to fetch.
     */
    where?: PhoneVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhoneVerifications to fetch.
     */
    orderBy?: PhoneVerificationOrderByWithRelationInput | PhoneVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PhoneVerifications.
     */
    cursor?: PhoneVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhoneVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhoneVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PhoneVerifications.
     */
    distinct?: PhoneVerificationScalarFieldEnum | PhoneVerificationScalarFieldEnum[]
  }

  /**
   * PhoneVerification findMany
   */
  export type PhoneVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * Filter, which PhoneVerifications to fetch.
     */
    where?: PhoneVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PhoneVerifications to fetch.
     */
    orderBy?: PhoneVerificationOrderByWithRelationInput | PhoneVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PhoneVerifications.
     */
    cursor?: PhoneVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PhoneVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PhoneVerifications.
     */
    skip?: number
    distinct?: PhoneVerificationScalarFieldEnum | PhoneVerificationScalarFieldEnum[]
  }

  /**
   * PhoneVerification create
   */
  export type PhoneVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a PhoneVerification.
     */
    data: XOR<PhoneVerificationCreateInput, PhoneVerificationUncheckedCreateInput>
  }

  /**
   * PhoneVerification createMany
   */
  export type PhoneVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PhoneVerifications.
     */
    data: PhoneVerificationCreateManyInput | PhoneVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PhoneVerification createManyAndReturn
   */
  export type PhoneVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many PhoneVerifications.
     */
    data: PhoneVerificationCreateManyInput | PhoneVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PhoneVerification update
   */
  export type PhoneVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a PhoneVerification.
     */
    data: XOR<PhoneVerificationUpdateInput, PhoneVerificationUncheckedUpdateInput>
    /**
     * Choose, which PhoneVerification to update.
     */
    where: PhoneVerificationWhereUniqueInput
  }

  /**
   * PhoneVerification updateMany
   */
  export type PhoneVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PhoneVerifications.
     */
    data: XOR<PhoneVerificationUpdateManyMutationInput, PhoneVerificationUncheckedUpdateManyInput>
    /**
     * Filter which PhoneVerifications to update
     */
    where?: PhoneVerificationWhereInput
    /**
     * Limit how many PhoneVerifications to update.
     */
    limit?: number
  }

  /**
   * PhoneVerification updateManyAndReturn
   */
  export type PhoneVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * The data used to update PhoneVerifications.
     */
    data: XOR<PhoneVerificationUpdateManyMutationInput, PhoneVerificationUncheckedUpdateManyInput>
    /**
     * Filter which PhoneVerifications to update
     */
    where?: PhoneVerificationWhereInput
    /**
     * Limit how many PhoneVerifications to update.
     */
    limit?: number
  }

  /**
   * PhoneVerification upsert
   */
  export type PhoneVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the PhoneVerification to update in case it exists.
     */
    where: PhoneVerificationWhereUniqueInput
    /**
     * In case the PhoneVerification found by the `where` argument doesn't exist, create a new PhoneVerification with this data.
     */
    create: XOR<PhoneVerificationCreateInput, PhoneVerificationUncheckedCreateInput>
    /**
     * In case the PhoneVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PhoneVerificationUpdateInput, PhoneVerificationUncheckedUpdateInput>
  }

  /**
   * PhoneVerification delete
   */
  export type PhoneVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
    /**
     * Filter which PhoneVerification to delete.
     */
    where: PhoneVerificationWhereUniqueInput
  }

  /**
   * PhoneVerification deleteMany
   */
  export type PhoneVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PhoneVerifications to delete
     */
    where?: PhoneVerificationWhereInput
    /**
     * Limit how many PhoneVerifications to delete.
     */
    limit?: number
  }

  /**
   * PhoneVerification without action
   */
  export type PhoneVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PhoneVerification
     */
    select?: PhoneVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PhoneVerification
     */
    omit?: PhoneVerificationOmit<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    slug: string | null
    overview: string | null
    coverImage: string | null
    status: $Enums.ServiceStatus | null
    providerId: string | null
    categoryId: string | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    slug: string | null
    overview: string | null
    coverImage: string | null
    status: $Enums.ServiceStatus | null
    providerId: string | null
    categoryId: string | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    slug: number
    overview: number
    coverImage: number
    tags: number
    status: number
    providerId: number
    categoryId: number
    _all: number
  }


  export type ServiceMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    overview?: true
    coverImage?: true
    status?: true
    providerId?: true
    categoryId?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    overview?: true
    coverImage?: true
    status?: true
    providerId?: true
    categoryId?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    overview?: true
    coverImage?: true
    tags?: true
    status?: true
    providerId?: true
    categoryId?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    slug: string
    overview: string
    coverImage: string | null
    tags: string[]
    status: $Enums.ServiceStatus
    providerId: string
    categoryId: string
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    overview?: boolean
    coverImage?: boolean
    tags?: boolean
    status?: boolean
    providerId?: boolean
    categoryId?: boolean
    provider?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    plans?: boolean | Service$plansArgs<ExtArgs>
    addons?: boolean | Service$addonsArgs<ExtArgs>
    images?: boolean | Service$imagesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    overview?: boolean
    coverImage?: boolean
    tags?: boolean
    status?: boolean
    providerId?: boolean
    categoryId?: boolean
    provider?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    overview?: boolean
    coverImage?: boolean
    tags?: boolean
    status?: boolean
    providerId?: boolean
    categoryId?: boolean
    provider?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    overview?: boolean
    coverImage?: boolean
    tags?: boolean
    status?: boolean
    providerId?: boolean
    categoryId?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "title" | "slug" | "overview" | "coverImage" | "tags" | "status" | "providerId" | "categoryId", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    plans?: boolean | Service$plansArgs<ExtArgs>
    addons?: boolean | Service$addonsArgs<ExtArgs>
    images?: boolean | Service$imagesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      provider: Prisma.$UserPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
      plans: Prisma.$ServicePlanPayload<ExtArgs>[]
      addons: Prisma.$ServiceAddonPayload<ExtArgs>[]
      images: Prisma.$ServiceImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      title: string
      slug: string
      overview: string
      coverImage: string | null
      tags: string[]
      status: $Enums.ServiceStatus
      providerId: string
      categoryId: string
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provider<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    plans<T extends Service$plansArgs<ExtArgs> = {}>(args?: Subset<T, Service$plansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    addons<T extends Service$addonsArgs<ExtArgs> = {}>(args?: Subset<T, Service$addonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    images<T extends Service$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Service$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
    readonly title: FieldRef<"Service", 'String'>
    readonly slug: FieldRef<"Service", 'String'>
    readonly overview: FieldRef<"Service", 'String'>
    readonly coverImage: FieldRef<"Service", 'String'>
    readonly tags: FieldRef<"Service", 'String[]'>
    readonly status: FieldRef<"Service", 'ServiceStatus'>
    readonly providerId: FieldRef<"Service", 'String'>
    readonly categoryId: FieldRef<"Service", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.plans
   */
  export type Service$plansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    where?: ServicePlanWhereInput
    orderBy?: ServicePlanOrderByWithRelationInput | ServicePlanOrderByWithRelationInput[]
    cursor?: ServicePlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServicePlanScalarFieldEnum | ServicePlanScalarFieldEnum[]
  }

  /**
   * Service.addons
   */
  export type Service$addonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    where?: ServiceAddonWhereInput
    orderBy?: ServiceAddonOrderByWithRelationInput | ServiceAddonOrderByWithRelationInput[]
    cursor?: ServiceAddonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceAddonScalarFieldEnum | ServiceAddonScalarFieldEnum[]
  }

  /**
   * Service.images
   */
  export type Service$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    where?: ServiceImageWhereInput
    orderBy?: ServiceImageOrderByWithRelationInput | ServiceImageOrderByWithRelationInput[]
    cursor?: ServiceImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceImageScalarFieldEnum | ServiceImageScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model ServicePlan
   */

  export type AggregateServicePlan = {
    _count: ServicePlanCountAggregateOutputType | null
    _avg: ServicePlanAvgAggregateOutputType | null
    _sum: ServicePlanSumAggregateOutputType | null
    _min: ServicePlanMinAggregateOutputType | null
    _max: ServicePlanMaxAggregateOutputType | null
  }

  export type ServicePlanAvgAggregateOutputType = {
    price: Decimal | null
    sortOrder: number | null
  }

  export type ServicePlanSumAggregateOutputType = {
    price: Decimal | null
    sortOrder: number | null
  }

  export type ServicePlanMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    price: Decimal | null
    inclusions: string | null
    isPopular: boolean | null
    sortOrder: number | null
    serviceId: string | null
  }

  export type ServicePlanMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    price: Decimal | null
    inclusions: string | null
    isPopular: boolean | null
    sortOrder: number | null
    serviceId: string | null
  }

  export type ServicePlanCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    price: number
    inclusions: number
    isPopular: number
    sortOrder: number
    serviceId: number
    _all: number
  }


  export type ServicePlanAvgAggregateInputType = {
    price?: true
    sortOrder?: true
  }

  export type ServicePlanSumAggregateInputType = {
    price?: true
    sortOrder?: true
  }

  export type ServicePlanMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    price?: true
    inclusions?: true
    isPopular?: true
    sortOrder?: true
    serviceId?: true
  }

  export type ServicePlanMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    price?: true
    inclusions?: true
    isPopular?: true
    sortOrder?: true
    serviceId?: true
  }

  export type ServicePlanCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    price?: true
    inclusions?: true
    isPopular?: true
    sortOrder?: true
    serviceId?: true
    _all?: true
  }

  export type ServicePlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServicePlan to aggregate.
     */
    where?: ServicePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServicePlans to fetch.
     */
    orderBy?: ServicePlanOrderByWithRelationInput | ServicePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServicePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServicePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServicePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServicePlans
    **/
    _count?: true | ServicePlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServicePlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServicePlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServicePlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServicePlanMaxAggregateInputType
  }

  export type GetServicePlanAggregateType<T extends ServicePlanAggregateArgs> = {
        [P in keyof T & keyof AggregateServicePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServicePlan[P]>
      : GetScalarType<T[P], AggregateServicePlan[P]>
  }




  export type ServicePlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServicePlanWhereInput
    orderBy?: ServicePlanOrderByWithAggregationInput | ServicePlanOrderByWithAggregationInput[]
    by: ServicePlanScalarFieldEnum[] | ServicePlanScalarFieldEnum
    having?: ServicePlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServicePlanCountAggregateInputType | true
    _avg?: ServicePlanAvgAggregateInputType
    _sum?: ServicePlanSumAggregateInputType
    _min?: ServicePlanMinAggregateInputType
    _max?: ServicePlanMaxAggregateInputType
  }

  export type ServicePlanGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    price: Decimal
    inclusions: string
    isPopular: boolean
    sortOrder: number
    serviceId: string
    _count: ServicePlanCountAggregateOutputType | null
    _avg: ServicePlanAvgAggregateOutputType | null
    _sum: ServicePlanSumAggregateOutputType | null
    _min: ServicePlanMinAggregateOutputType | null
    _max: ServicePlanMaxAggregateOutputType | null
  }

  type GetServicePlanGroupByPayload<T extends ServicePlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServicePlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServicePlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServicePlanGroupByOutputType[P]>
            : GetScalarType<T[P], ServicePlanGroupByOutputType[P]>
        }
      >
    >


  export type ServicePlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    price?: boolean
    inclusions?: boolean
    isPopular?: boolean
    sortOrder?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["servicePlan"]>

  export type ServicePlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    price?: boolean
    inclusions?: boolean
    isPopular?: boolean
    sortOrder?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["servicePlan"]>

  export type ServicePlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    price?: boolean
    inclusions?: boolean
    isPopular?: boolean
    sortOrder?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["servicePlan"]>

  export type ServicePlanSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    price?: boolean
    inclusions?: boolean
    isPopular?: boolean
    sortOrder?: boolean
    serviceId?: boolean
  }

  export type ServicePlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "title" | "price" | "inclusions" | "isPopular" | "sortOrder" | "serviceId", ExtArgs["result"]["servicePlan"]>
  export type ServicePlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServicePlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServicePlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ServicePlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServicePlan"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      title: string
      price: Prisma.Decimal
      inclusions: string
      isPopular: boolean
      sortOrder: number
      serviceId: string
    }, ExtArgs["result"]["servicePlan"]>
    composites: {}
  }

  type ServicePlanGetPayload<S extends boolean | null | undefined | ServicePlanDefaultArgs> = $Result.GetResult<Prisma.$ServicePlanPayload, S>

  type ServicePlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServicePlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServicePlanCountAggregateInputType | true
    }

  export interface ServicePlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServicePlan'], meta: { name: 'ServicePlan' } }
    /**
     * Find zero or one ServicePlan that matches the filter.
     * @param {ServicePlanFindUniqueArgs} args - Arguments to find a ServicePlan
     * @example
     * // Get one ServicePlan
     * const servicePlan = await prisma.servicePlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServicePlanFindUniqueArgs>(args: SelectSubset<T, ServicePlanFindUniqueArgs<ExtArgs>>): Prisma__ServicePlanClient<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServicePlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServicePlanFindUniqueOrThrowArgs} args - Arguments to find a ServicePlan
     * @example
     * // Get one ServicePlan
     * const servicePlan = await prisma.servicePlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServicePlanFindUniqueOrThrowArgs>(args: SelectSubset<T, ServicePlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServicePlanClient<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServicePlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePlanFindFirstArgs} args - Arguments to find a ServicePlan
     * @example
     * // Get one ServicePlan
     * const servicePlan = await prisma.servicePlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServicePlanFindFirstArgs>(args?: SelectSubset<T, ServicePlanFindFirstArgs<ExtArgs>>): Prisma__ServicePlanClient<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServicePlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePlanFindFirstOrThrowArgs} args - Arguments to find a ServicePlan
     * @example
     * // Get one ServicePlan
     * const servicePlan = await prisma.servicePlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServicePlanFindFirstOrThrowArgs>(args?: SelectSubset<T, ServicePlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServicePlanClient<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServicePlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServicePlans
     * const servicePlans = await prisma.servicePlan.findMany()
     * 
     * // Get first 10 ServicePlans
     * const servicePlans = await prisma.servicePlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const servicePlanWithIdOnly = await prisma.servicePlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServicePlanFindManyArgs>(args?: SelectSubset<T, ServicePlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServicePlan.
     * @param {ServicePlanCreateArgs} args - Arguments to create a ServicePlan.
     * @example
     * // Create one ServicePlan
     * const ServicePlan = await prisma.servicePlan.create({
     *   data: {
     *     // ... data to create a ServicePlan
     *   }
     * })
     * 
     */
    create<T extends ServicePlanCreateArgs>(args: SelectSubset<T, ServicePlanCreateArgs<ExtArgs>>): Prisma__ServicePlanClient<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServicePlans.
     * @param {ServicePlanCreateManyArgs} args - Arguments to create many ServicePlans.
     * @example
     * // Create many ServicePlans
     * const servicePlan = await prisma.servicePlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServicePlanCreateManyArgs>(args?: SelectSubset<T, ServicePlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServicePlans and returns the data saved in the database.
     * @param {ServicePlanCreateManyAndReturnArgs} args - Arguments to create many ServicePlans.
     * @example
     * // Create many ServicePlans
     * const servicePlan = await prisma.servicePlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServicePlans and only return the `id`
     * const servicePlanWithIdOnly = await prisma.servicePlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServicePlanCreateManyAndReturnArgs>(args?: SelectSubset<T, ServicePlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServicePlan.
     * @param {ServicePlanDeleteArgs} args - Arguments to delete one ServicePlan.
     * @example
     * // Delete one ServicePlan
     * const ServicePlan = await prisma.servicePlan.delete({
     *   where: {
     *     // ... filter to delete one ServicePlan
     *   }
     * })
     * 
     */
    delete<T extends ServicePlanDeleteArgs>(args: SelectSubset<T, ServicePlanDeleteArgs<ExtArgs>>): Prisma__ServicePlanClient<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServicePlan.
     * @param {ServicePlanUpdateArgs} args - Arguments to update one ServicePlan.
     * @example
     * // Update one ServicePlan
     * const servicePlan = await prisma.servicePlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServicePlanUpdateArgs>(args: SelectSubset<T, ServicePlanUpdateArgs<ExtArgs>>): Prisma__ServicePlanClient<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServicePlans.
     * @param {ServicePlanDeleteManyArgs} args - Arguments to filter ServicePlans to delete.
     * @example
     * // Delete a few ServicePlans
     * const { count } = await prisma.servicePlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServicePlanDeleteManyArgs>(args?: SelectSubset<T, ServicePlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServicePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServicePlans
     * const servicePlan = await prisma.servicePlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServicePlanUpdateManyArgs>(args: SelectSubset<T, ServicePlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServicePlans and returns the data updated in the database.
     * @param {ServicePlanUpdateManyAndReturnArgs} args - Arguments to update many ServicePlans.
     * @example
     * // Update many ServicePlans
     * const servicePlan = await prisma.servicePlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServicePlans and only return the `id`
     * const servicePlanWithIdOnly = await prisma.servicePlan.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServicePlanUpdateManyAndReturnArgs>(args: SelectSubset<T, ServicePlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServicePlan.
     * @param {ServicePlanUpsertArgs} args - Arguments to update or create a ServicePlan.
     * @example
     * // Update or create a ServicePlan
     * const servicePlan = await prisma.servicePlan.upsert({
     *   create: {
     *     // ... data to create a ServicePlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServicePlan we want to update
     *   }
     * })
     */
    upsert<T extends ServicePlanUpsertArgs>(args: SelectSubset<T, ServicePlanUpsertArgs<ExtArgs>>): Prisma__ServicePlanClient<$Result.GetResult<Prisma.$ServicePlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServicePlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePlanCountArgs} args - Arguments to filter ServicePlans to count.
     * @example
     * // Count the number of ServicePlans
     * const count = await prisma.servicePlan.count({
     *   where: {
     *     // ... the filter for the ServicePlans we want to count
     *   }
     * })
    **/
    count<T extends ServicePlanCountArgs>(
      args?: Subset<T, ServicePlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServicePlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServicePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServicePlanAggregateArgs>(args: Subset<T, ServicePlanAggregateArgs>): Prisma.PrismaPromise<GetServicePlanAggregateType<T>>

    /**
     * Group by ServicePlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServicePlanGroupByArgs} args - Group by arguments.
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
      T extends ServicePlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServicePlanGroupByArgs['orderBy'] }
        : { orderBy?: ServicePlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServicePlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServicePlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServicePlan model
   */
  readonly fields: ServicePlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServicePlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServicePlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ServicePlan model
   */
  interface ServicePlanFieldRefs {
    readonly id: FieldRef<"ServicePlan", 'String'>
    readonly createdAt: FieldRef<"ServicePlan", 'DateTime'>
    readonly updatedAt: FieldRef<"ServicePlan", 'DateTime'>
    readonly title: FieldRef<"ServicePlan", 'String'>
    readonly price: FieldRef<"ServicePlan", 'Decimal'>
    readonly inclusions: FieldRef<"ServicePlan", 'String'>
    readonly isPopular: FieldRef<"ServicePlan", 'Boolean'>
    readonly sortOrder: FieldRef<"ServicePlan", 'Int'>
    readonly serviceId: FieldRef<"ServicePlan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ServicePlan findUnique
   */
  export type ServicePlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * Filter, which ServicePlan to fetch.
     */
    where: ServicePlanWhereUniqueInput
  }

  /**
   * ServicePlan findUniqueOrThrow
   */
  export type ServicePlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * Filter, which ServicePlan to fetch.
     */
    where: ServicePlanWhereUniqueInput
  }

  /**
   * ServicePlan findFirst
   */
  export type ServicePlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * Filter, which ServicePlan to fetch.
     */
    where?: ServicePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServicePlans to fetch.
     */
    orderBy?: ServicePlanOrderByWithRelationInput | ServicePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServicePlans.
     */
    cursor?: ServicePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServicePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServicePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServicePlans.
     */
    distinct?: ServicePlanScalarFieldEnum | ServicePlanScalarFieldEnum[]
  }

  /**
   * ServicePlan findFirstOrThrow
   */
  export type ServicePlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * Filter, which ServicePlan to fetch.
     */
    where?: ServicePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServicePlans to fetch.
     */
    orderBy?: ServicePlanOrderByWithRelationInput | ServicePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServicePlans.
     */
    cursor?: ServicePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServicePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServicePlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServicePlans.
     */
    distinct?: ServicePlanScalarFieldEnum | ServicePlanScalarFieldEnum[]
  }

  /**
   * ServicePlan findMany
   */
  export type ServicePlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * Filter, which ServicePlans to fetch.
     */
    where?: ServicePlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServicePlans to fetch.
     */
    orderBy?: ServicePlanOrderByWithRelationInput | ServicePlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServicePlans.
     */
    cursor?: ServicePlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServicePlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServicePlans.
     */
    skip?: number
    distinct?: ServicePlanScalarFieldEnum | ServicePlanScalarFieldEnum[]
  }

  /**
   * ServicePlan create
   */
  export type ServicePlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * The data needed to create a ServicePlan.
     */
    data: XOR<ServicePlanCreateInput, ServicePlanUncheckedCreateInput>
  }

  /**
   * ServicePlan createMany
   */
  export type ServicePlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServicePlans.
     */
    data: ServicePlanCreateManyInput | ServicePlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServicePlan createManyAndReturn
   */
  export type ServicePlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * The data used to create many ServicePlans.
     */
    data: ServicePlanCreateManyInput | ServicePlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServicePlan update
   */
  export type ServicePlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * The data needed to update a ServicePlan.
     */
    data: XOR<ServicePlanUpdateInput, ServicePlanUncheckedUpdateInput>
    /**
     * Choose, which ServicePlan to update.
     */
    where: ServicePlanWhereUniqueInput
  }

  /**
   * ServicePlan updateMany
   */
  export type ServicePlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServicePlans.
     */
    data: XOR<ServicePlanUpdateManyMutationInput, ServicePlanUncheckedUpdateManyInput>
    /**
     * Filter which ServicePlans to update
     */
    where?: ServicePlanWhereInput
    /**
     * Limit how many ServicePlans to update.
     */
    limit?: number
  }

  /**
   * ServicePlan updateManyAndReturn
   */
  export type ServicePlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * The data used to update ServicePlans.
     */
    data: XOR<ServicePlanUpdateManyMutationInput, ServicePlanUncheckedUpdateManyInput>
    /**
     * Filter which ServicePlans to update
     */
    where?: ServicePlanWhereInput
    /**
     * Limit how many ServicePlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServicePlan upsert
   */
  export type ServicePlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * The filter to search for the ServicePlan to update in case it exists.
     */
    where: ServicePlanWhereUniqueInput
    /**
     * In case the ServicePlan found by the `where` argument doesn't exist, create a new ServicePlan with this data.
     */
    create: XOR<ServicePlanCreateInput, ServicePlanUncheckedCreateInput>
    /**
     * In case the ServicePlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServicePlanUpdateInput, ServicePlanUncheckedUpdateInput>
  }

  /**
   * ServicePlan delete
   */
  export type ServicePlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
    /**
     * Filter which ServicePlan to delete.
     */
    where: ServicePlanWhereUniqueInput
  }

  /**
   * ServicePlan deleteMany
   */
  export type ServicePlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServicePlans to delete
     */
    where?: ServicePlanWhereInput
    /**
     * Limit how many ServicePlans to delete.
     */
    limit?: number
  }

  /**
   * ServicePlan without action
   */
  export type ServicePlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServicePlan
     */
    select?: ServicePlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServicePlan
     */
    omit?: ServicePlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServicePlanInclude<ExtArgs> | null
  }


  /**
   * Model ServiceAddon
   */

  export type AggregateServiceAddon = {
    _count: ServiceAddonCountAggregateOutputType | null
    _avg: ServiceAddonAvgAggregateOutputType | null
    _sum: ServiceAddonSumAggregateOutputType | null
    _min: ServiceAddonMinAggregateOutputType | null
    _max: ServiceAddonMaxAggregateOutputType | null
  }

  export type ServiceAddonAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type ServiceAddonSumAggregateOutputType = {
    price: Decimal | null
  }

  export type ServiceAddonMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    description: string | null
    price: Decimal | null
    serviceId: string | null
  }

  export type ServiceAddonMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    description: string | null
    price: Decimal | null
    serviceId: string | null
  }

  export type ServiceAddonCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    description: number
    price: number
    serviceId: number
    _all: number
  }


  export type ServiceAddonAvgAggregateInputType = {
    price?: true
  }

  export type ServiceAddonSumAggregateInputType = {
    price?: true
  }

  export type ServiceAddonMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    description?: true
    price?: true
    serviceId?: true
  }

  export type ServiceAddonMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    description?: true
    price?: true
    serviceId?: true
  }

  export type ServiceAddonCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    description?: true
    price?: true
    serviceId?: true
    _all?: true
  }

  export type ServiceAddonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceAddon to aggregate.
     */
    where?: ServiceAddonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceAddons to fetch.
     */
    orderBy?: ServiceAddonOrderByWithRelationInput | ServiceAddonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceAddonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceAddons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceAddons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceAddons
    **/
    _count?: true | ServiceAddonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAddonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceAddonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceAddonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceAddonMaxAggregateInputType
  }

  export type GetServiceAddonAggregateType<T extends ServiceAddonAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceAddon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceAddon[P]>
      : GetScalarType<T[P], AggregateServiceAddon[P]>
  }




  export type ServiceAddonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceAddonWhereInput
    orderBy?: ServiceAddonOrderByWithAggregationInput | ServiceAddonOrderByWithAggregationInput[]
    by: ServiceAddonScalarFieldEnum[] | ServiceAddonScalarFieldEnum
    having?: ServiceAddonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceAddonCountAggregateInputType | true
    _avg?: ServiceAddonAvgAggregateInputType
    _sum?: ServiceAddonSumAggregateInputType
    _min?: ServiceAddonMinAggregateInputType
    _max?: ServiceAddonMaxAggregateInputType
  }

  export type ServiceAddonGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    description: string | null
    price: Decimal
    serviceId: string
    _count: ServiceAddonCountAggregateOutputType | null
    _avg: ServiceAddonAvgAggregateOutputType | null
    _sum: ServiceAddonSumAggregateOutputType | null
    _min: ServiceAddonMinAggregateOutputType | null
    _max: ServiceAddonMaxAggregateOutputType | null
  }

  type GetServiceAddonGroupByPayload<T extends ServiceAddonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceAddonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceAddonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceAddonGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceAddonGroupByOutputType[P]>
        }
      >
    >


  export type ServiceAddonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceAddon"]>

  export type ServiceAddonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceAddon"]>

  export type ServiceAddonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceAddon"]>

  export type ServiceAddonSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    description?: boolean
    price?: boolean
    serviceId?: boolean
  }

  export type ServiceAddonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "title" | "description" | "price" | "serviceId", ExtArgs["result"]["serviceAddon"]>
  export type ServiceAddonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceAddonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceAddonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ServiceAddonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceAddon"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      title: string
      description: string | null
      price: Prisma.Decimal
      serviceId: string
    }, ExtArgs["result"]["serviceAddon"]>
    composites: {}
  }

  type ServiceAddonGetPayload<S extends boolean | null | undefined | ServiceAddonDefaultArgs> = $Result.GetResult<Prisma.$ServiceAddonPayload, S>

  type ServiceAddonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceAddonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceAddonCountAggregateInputType | true
    }

  export interface ServiceAddonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceAddon'], meta: { name: 'ServiceAddon' } }
    /**
     * Find zero or one ServiceAddon that matches the filter.
     * @param {ServiceAddonFindUniqueArgs} args - Arguments to find a ServiceAddon
     * @example
     * // Get one ServiceAddon
     * const serviceAddon = await prisma.serviceAddon.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceAddonFindUniqueArgs>(args: SelectSubset<T, ServiceAddonFindUniqueArgs<ExtArgs>>): Prisma__ServiceAddonClient<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceAddon that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceAddonFindUniqueOrThrowArgs} args - Arguments to find a ServiceAddon
     * @example
     * // Get one ServiceAddon
     * const serviceAddon = await prisma.serviceAddon.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceAddonFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceAddonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceAddonClient<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceAddon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAddonFindFirstArgs} args - Arguments to find a ServiceAddon
     * @example
     * // Get one ServiceAddon
     * const serviceAddon = await prisma.serviceAddon.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceAddonFindFirstArgs>(args?: SelectSubset<T, ServiceAddonFindFirstArgs<ExtArgs>>): Prisma__ServiceAddonClient<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceAddon that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAddonFindFirstOrThrowArgs} args - Arguments to find a ServiceAddon
     * @example
     * // Get one ServiceAddon
     * const serviceAddon = await prisma.serviceAddon.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceAddonFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceAddonFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceAddonClient<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceAddons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAddonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceAddons
     * const serviceAddons = await prisma.serviceAddon.findMany()
     * 
     * // Get first 10 ServiceAddons
     * const serviceAddons = await prisma.serviceAddon.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceAddonWithIdOnly = await prisma.serviceAddon.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceAddonFindManyArgs>(args?: SelectSubset<T, ServiceAddonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceAddon.
     * @param {ServiceAddonCreateArgs} args - Arguments to create a ServiceAddon.
     * @example
     * // Create one ServiceAddon
     * const ServiceAddon = await prisma.serviceAddon.create({
     *   data: {
     *     // ... data to create a ServiceAddon
     *   }
     * })
     * 
     */
    create<T extends ServiceAddonCreateArgs>(args: SelectSubset<T, ServiceAddonCreateArgs<ExtArgs>>): Prisma__ServiceAddonClient<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceAddons.
     * @param {ServiceAddonCreateManyArgs} args - Arguments to create many ServiceAddons.
     * @example
     * // Create many ServiceAddons
     * const serviceAddon = await prisma.serviceAddon.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceAddonCreateManyArgs>(args?: SelectSubset<T, ServiceAddonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceAddons and returns the data saved in the database.
     * @param {ServiceAddonCreateManyAndReturnArgs} args - Arguments to create many ServiceAddons.
     * @example
     * // Create many ServiceAddons
     * const serviceAddon = await prisma.serviceAddon.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceAddons and only return the `id`
     * const serviceAddonWithIdOnly = await prisma.serviceAddon.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceAddonCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceAddonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceAddon.
     * @param {ServiceAddonDeleteArgs} args - Arguments to delete one ServiceAddon.
     * @example
     * // Delete one ServiceAddon
     * const ServiceAddon = await prisma.serviceAddon.delete({
     *   where: {
     *     // ... filter to delete one ServiceAddon
     *   }
     * })
     * 
     */
    delete<T extends ServiceAddonDeleteArgs>(args: SelectSubset<T, ServiceAddonDeleteArgs<ExtArgs>>): Prisma__ServiceAddonClient<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceAddon.
     * @param {ServiceAddonUpdateArgs} args - Arguments to update one ServiceAddon.
     * @example
     * // Update one ServiceAddon
     * const serviceAddon = await prisma.serviceAddon.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceAddonUpdateArgs>(args: SelectSubset<T, ServiceAddonUpdateArgs<ExtArgs>>): Prisma__ServiceAddonClient<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceAddons.
     * @param {ServiceAddonDeleteManyArgs} args - Arguments to filter ServiceAddons to delete.
     * @example
     * // Delete a few ServiceAddons
     * const { count } = await prisma.serviceAddon.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceAddonDeleteManyArgs>(args?: SelectSubset<T, ServiceAddonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceAddons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAddonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceAddons
     * const serviceAddon = await prisma.serviceAddon.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceAddonUpdateManyArgs>(args: SelectSubset<T, ServiceAddonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceAddons and returns the data updated in the database.
     * @param {ServiceAddonUpdateManyAndReturnArgs} args - Arguments to update many ServiceAddons.
     * @example
     * // Update many ServiceAddons
     * const serviceAddon = await prisma.serviceAddon.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceAddons and only return the `id`
     * const serviceAddonWithIdOnly = await prisma.serviceAddon.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceAddonUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceAddonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceAddon.
     * @param {ServiceAddonUpsertArgs} args - Arguments to update or create a ServiceAddon.
     * @example
     * // Update or create a ServiceAddon
     * const serviceAddon = await prisma.serviceAddon.upsert({
     *   create: {
     *     // ... data to create a ServiceAddon
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceAddon we want to update
     *   }
     * })
     */
    upsert<T extends ServiceAddonUpsertArgs>(args: SelectSubset<T, ServiceAddonUpsertArgs<ExtArgs>>): Prisma__ServiceAddonClient<$Result.GetResult<Prisma.$ServiceAddonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceAddons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAddonCountArgs} args - Arguments to filter ServiceAddons to count.
     * @example
     * // Count the number of ServiceAddons
     * const count = await prisma.serviceAddon.count({
     *   where: {
     *     // ... the filter for the ServiceAddons we want to count
     *   }
     * })
    **/
    count<T extends ServiceAddonCountArgs>(
      args?: Subset<T, ServiceAddonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceAddonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceAddon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAddonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAddonAggregateArgs>(args: Subset<T, ServiceAddonAggregateArgs>): Prisma.PrismaPromise<GetServiceAddonAggregateType<T>>

    /**
     * Group by ServiceAddon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAddonGroupByArgs} args - Group by arguments.
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
      T extends ServiceAddonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceAddonGroupByArgs['orderBy'] }
        : { orderBy?: ServiceAddonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceAddonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceAddonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceAddon model
   */
  readonly fields: ServiceAddonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceAddon.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceAddonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ServiceAddon model
   */
  interface ServiceAddonFieldRefs {
    readonly id: FieldRef<"ServiceAddon", 'String'>
    readonly createdAt: FieldRef<"ServiceAddon", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceAddon", 'DateTime'>
    readonly title: FieldRef<"ServiceAddon", 'String'>
    readonly description: FieldRef<"ServiceAddon", 'String'>
    readonly price: FieldRef<"ServiceAddon", 'Decimal'>
    readonly serviceId: FieldRef<"ServiceAddon", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ServiceAddon findUnique
   */
  export type ServiceAddonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * Filter, which ServiceAddon to fetch.
     */
    where: ServiceAddonWhereUniqueInput
  }

  /**
   * ServiceAddon findUniqueOrThrow
   */
  export type ServiceAddonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * Filter, which ServiceAddon to fetch.
     */
    where: ServiceAddonWhereUniqueInput
  }

  /**
   * ServiceAddon findFirst
   */
  export type ServiceAddonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * Filter, which ServiceAddon to fetch.
     */
    where?: ServiceAddonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceAddons to fetch.
     */
    orderBy?: ServiceAddonOrderByWithRelationInput | ServiceAddonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceAddons.
     */
    cursor?: ServiceAddonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceAddons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceAddons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceAddons.
     */
    distinct?: ServiceAddonScalarFieldEnum | ServiceAddonScalarFieldEnum[]
  }

  /**
   * ServiceAddon findFirstOrThrow
   */
  export type ServiceAddonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * Filter, which ServiceAddon to fetch.
     */
    where?: ServiceAddonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceAddons to fetch.
     */
    orderBy?: ServiceAddonOrderByWithRelationInput | ServiceAddonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceAddons.
     */
    cursor?: ServiceAddonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceAddons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceAddons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceAddons.
     */
    distinct?: ServiceAddonScalarFieldEnum | ServiceAddonScalarFieldEnum[]
  }

  /**
   * ServiceAddon findMany
   */
  export type ServiceAddonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * Filter, which ServiceAddons to fetch.
     */
    where?: ServiceAddonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceAddons to fetch.
     */
    orderBy?: ServiceAddonOrderByWithRelationInput | ServiceAddonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceAddons.
     */
    cursor?: ServiceAddonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceAddons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceAddons.
     */
    skip?: number
    distinct?: ServiceAddonScalarFieldEnum | ServiceAddonScalarFieldEnum[]
  }

  /**
   * ServiceAddon create
   */
  export type ServiceAddonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceAddon.
     */
    data: XOR<ServiceAddonCreateInput, ServiceAddonUncheckedCreateInput>
  }

  /**
   * ServiceAddon createMany
   */
  export type ServiceAddonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceAddons.
     */
    data: ServiceAddonCreateManyInput | ServiceAddonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceAddon createManyAndReturn
   */
  export type ServiceAddonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceAddons.
     */
    data: ServiceAddonCreateManyInput | ServiceAddonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceAddon update
   */
  export type ServiceAddonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceAddon.
     */
    data: XOR<ServiceAddonUpdateInput, ServiceAddonUncheckedUpdateInput>
    /**
     * Choose, which ServiceAddon to update.
     */
    where: ServiceAddonWhereUniqueInput
  }

  /**
   * ServiceAddon updateMany
   */
  export type ServiceAddonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceAddons.
     */
    data: XOR<ServiceAddonUpdateManyMutationInput, ServiceAddonUncheckedUpdateManyInput>
    /**
     * Filter which ServiceAddons to update
     */
    where?: ServiceAddonWhereInput
    /**
     * Limit how many ServiceAddons to update.
     */
    limit?: number
  }

  /**
   * ServiceAddon updateManyAndReturn
   */
  export type ServiceAddonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * The data used to update ServiceAddons.
     */
    data: XOR<ServiceAddonUpdateManyMutationInput, ServiceAddonUncheckedUpdateManyInput>
    /**
     * Filter which ServiceAddons to update
     */
    where?: ServiceAddonWhereInput
    /**
     * Limit how many ServiceAddons to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceAddon upsert
   */
  export type ServiceAddonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceAddon to update in case it exists.
     */
    where: ServiceAddonWhereUniqueInput
    /**
     * In case the ServiceAddon found by the `where` argument doesn't exist, create a new ServiceAddon with this data.
     */
    create: XOR<ServiceAddonCreateInput, ServiceAddonUncheckedCreateInput>
    /**
     * In case the ServiceAddon was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceAddonUpdateInput, ServiceAddonUncheckedUpdateInput>
  }

  /**
   * ServiceAddon delete
   */
  export type ServiceAddonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
    /**
     * Filter which ServiceAddon to delete.
     */
    where: ServiceAddonWhereUniqueInput
  }

  /**
   * ServiceAddon deleteMany
   */
  export type ServiceAddonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceAddons to delete
     */
    where?: ServiceAddonWhereInput
    /**
     * Limit how many ServiceAddons to delete.
     */
    limit?: number
  }

  /**
   * ServiceAddon without action
   */
  export type ServiceAddonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceAddon
     */
    select?: ServiceAddonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceAddon
     */
    omit?: ServiceAddonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceAddonInclude<ExtArgs> | null
  }


  /**
   * Model ServiceImage
   */

  export type AggregateServiceImage = {
    _count: ServiceImageCountAggregateOutputType | null
    _avg: ServiceImageAvgAggregateOutputType | null
    _sum: ServiceImageSumAggregateOutputType | null
    _min: ServiceImageMinAggregateOutputType | null
    _max: ServiceImageMaxAggregateOutputType | null
  }

  export type ServiceImageAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type ServiceImageSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type ServiceImageMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    url: string | null
    fileName: string | null
    sortOrder: number | null
    serviceId: string | null
  }

  export type ServiceImageMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    url: string | null
    fileName: string | null
    sortOrder: number | null
    serviceId: string | null
  }

  export type ServiceImageCountAggregateOutputType = {
    id: number
    createdAt: number
    url: number
    fileName: number
    sortOrder: number
    serviceId: number
    _all: number
  }


  export type ServiceImageAvgAggregateInputType = {
    sortOrder?: true
  }

  export type ServiceImageSumAggregateInputType = {
    sortOrder?: true
  }

  export type ServiceImageMinAggregateInputType = {
    id?: true
    createdAt?: true
    url?: true
    fileName?: true
    sortOrder?: true
    serviceId?: true
  }

  export type ServiceImageMaxAggregateInputType = {
    id?: true
    createdAt?: true
    url?: true
    fileName?: true
    sortOrder?: true
    serviceId?: true
  }

  export type ServiceImageCountAggregateInputType = {
    id?: true
    createdAt?: true
    url?: true
    fileName?: true
    sortOrder?: true
    serviceId?: true
    _all?: true
  }

  export type ServiceImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceImage to aggregate.
     */
    where?: ServiceImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceImages to fetch.
     */
    orderBy?: ServiceImageOrderByWithRelationInput | ServiceImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceImages
    **/
    _count?: true | ServiceImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceImageMaxAggregateInputType
  }

  export type GetServiceImageAggregateType<T extends ServiceImageAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceImage[P]>
      : GetScalarType<T[P], AggregateServiceImage[P]>
  }




  export type ServiceImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceImageWhereInput
    orderBy?: ServiceImageOrderByWithAggregationInput | ServiceImageOrderByWithAggregationInput[]
    by: ServiceImageScalarFieldEnum[] | ServiceImageScalarFieldEnum
    having?: ServiceImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceImageCountAggregateInputType | true
    _avg?: ServiceImageAvgAggregateInputType
    _sum?: ServiceImageSumAggregateInputType
    _min?: ServiceImageMinAggregateInputType
    _max?: ServiceImageMaxAggregateInputType
  }

  export type ServiceImageGroupByOutputType = {
    id: string
    createdAt: Date
    url: string
    fileName: string
    sortOrder: number
    serviceId: string
    _count: ServiceImageCountAggregateOutputType | null
    _avg: ServiceImageAvgAggregateOutputType | null
    _sum: ServiceImageSumAggregateOutputType | null
    _min: ServiceImageMinAggregateOutputType | null
    _max: ServiceImageMaxAggregateOutputType | null
  }

  type GetServiceImageGroupByPayload<T extends ServiceImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceImageGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceImageGroupByOutputType[P]>
        }
      >
    >


  export type ServiceImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    url?: boolean
    fileName?: boolean
    sortOrder?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceImage"]>

  export type ServiceImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    url?: boolean
    fileName?: boolean
    sortOrder?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceImage"]>

  export type ServiceImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    url?: boolean
    fileName?: boolean
    sortOrder?: boolean
    serviceId?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceImage"]>

  export type ServiceImageSelectScalar = {
    id?: boolean
    createdAt?: boolean
    url?: boolean
    fileName?: boolean
    sortOrder?: boolean
    serviceId?: boolean
  }

  export type ServiceImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "url" | "fileName" | "sortOrder" | "serviceId", ExtArgs["result"]["serviceImage"]>
  export type ServiceImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type ServiceImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $ServiceImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceImage"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      url: string
      fileName: string
      sortOrder: number
      serviceId: string
    }, ExtArgs["result"]["serviceImage"]>
    composites: {}
  }

  type ServiceImageGetPayload<S extends boolean | null | undefined | ServiceImageDefaultArgs> = $Result.GetResult<Prisma.$ServiceImagePayload, S>

  type ServiceImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceImageCountAggregateInputType | true
    }

  export interface ServiceImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceImage'], meta: { name: 'ServiceImage' } }
    /**
     * Find zero or one ServiceImage that matches the filter.
     * @param {ServiceImageFindUniqueArgs} args - Arguments to find a ServiceImage
     * @example
     * // Get one ServiceImage
     * const serviceImage = await prisma.serviceImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceImageFindUniqueArgs>(args: SelectSubset<T, ServiceImageFindUniqueArgs<ExtArgs>>): Prisma__ServiceImageClient<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceImageFindUniqueOrThrowArgs} args - Arguments to find a ServiceImage
     * @example
     * // Get one ServiceImage
     * const serviceImage = await prisma.serviceImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceImageClient<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceImageFindFirstArgs} args - Arguments to find a ServiceImage
     * @example
     * // Get one ServiceImage
     * const serviceImage = await prisma.serviceImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceImageFindFirstArgs>(args?: SelectSubset<T, ServiceImageFindFirstArgs<ExtArgs>>): Prisma__ServiceImageClient<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceImageFindFirstOrThrowArgs} args - Arguments to find a ServiceImage
     * @example
     * // Get one ServiceImage
     * const serviceImage = await prisma.serviceImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceImageClient<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceImages
     * const serviceImages = await prisma.serviceImage.findMany()
     * 
     * // Get first 10 ServiceImages
     * const serviceImages = await prisma.serviceImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceImageWithIdOnly = await prisma.serviceImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceImageFindManyArgs>(args?: SelectSubset<T, ServiceImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceImage.
     * @param {ServiceImageCreateArgs} args - Arguments to create a ServiceImage.
     * @example
     * // Create one ServiceImage
     * const ServiceImage = await prisma.serviceImage.create({
     *   data: {
     *     // ... data to create a ServiceImage
     *   }
     * })
     * 
     */
    create<T extends ServiceImageCreateArgs>(args: SelectSubset<T, ServiceImageCreateArgs<ExtArgs>>): Prisma__ServiceImageClient<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceImages.
     * @param {ServiceImageCreateManyArgs} args - Arguments to create many ServiceImages.
     * @example
     * // Create many ServiceImages
     * const serviceImage = await prisma.serviceImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceImageCreateManyArgs>(args?: SelectSubset<T, ServiceImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceImages and returns the data saved in the database.
     * @param {ServiceImageCreateManyAndReturnArgs} args - Arguments to create many ServiceImages.
     * @example
     * // Create many ServiceImages
     * const serviceImage = await prisma.serviceImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceImages and only return the `id`
     * const serviceImageWithIdOnly = await prisma.serviceImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceImage.
     * @param {ServiceImageDeleteArgs} args - Arguments to delete one ServiceImage.
     * @example
     * // Delete one ServiceImage
     * const ServiceImage = await prisma.serviceImage.delete({
     *   where: {
     *     // ... filter to delete one ServiceImage
     *   }
     * })
     * 
     */
    delete<T extends ServiceImageDeleteArgs>(args: SelectSubset<T, ServiceImageDeleteArgs<ExtArgs>>): Prisma__ServiceImageClient<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceImage.
     * @param {ServiceImageUpdateArgs} args - Arguments to update one ServiceImage.
     * @example
     * // Update one ServiceImage
     * const serviceImage = await prisma.serviceImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceImageUpdateArgs>(args: SelectSubset<T, ServiceImageUpdateArgs<ExtArgs>>): Prisma__ServiceImageClient<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceImages.
     * @param {ServiceImageDeleteManyArgs} args - Arguments to filter ServiceImages to delete.
     * @example
     * // Delete a few ServiceImages
     * const { count } = await prisma.serviceImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceImageDeleteManyArgs>(args?: SelectSubset<T, ServiceImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceImages
     * const serviceImage = await prisma.serviceImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceImageUpdateManyArgs>(args: SelectSubset<T, ServiceImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceImages and returns the data updated in the database.
     * @param {ServiceImageUpdateManyAndReturnArgs} args - Arguments to update many ServiceImages.
     * @example
     * // Update many ServiceImages
     * const serviceImage = await prisma.serviceImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceImages and only return the `id`
     * const serviceImageWithIdOnly = await prisma.serviceImage.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceImageUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceImage.
     * @param {ServiceImageUpsertArgs} args - Arguments to update or create a ServiceImage.
     * @example
     * // Update or create a ServiceImage
     * const serviceImage = await prisma.serviceImage.upsert({
     *   create: {
     *     // ... data to create a ServiceImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceImage we want to update
     *   }
     * })
     */
    upsert<T extends ServiceImageUpsertArgs>(args: SelectSubset<T, ServiceImageUpsertArgs<ExtArgs>>): Prisma__ServiceImageClient<$Result.GetResult<Prisma.$ServiceImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceImageCountArgs} args - Arguments to filter ServiceImages to count.
     * @example
     * // Count the number of ServiceImages
     * const count = await prisma.serviceImage.count({
     *   where: {
     *     // ... the filter for the ServiceImages we want to count
     *   }
     * })
    **/
    count<T extends ServiceImageCountArgs>(
      args?: Subset<T, ServiceImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceImageAggregateArgs>(args: Subset<T, ServiceImageAggregateArgs>): Prisma.PrismaPromise<GetServiceImageAggregateType<T>>

    /**
     * Group by ServiceImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceImageGroupByArgs} args - Group by arguments.
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
      T extends ServiceImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceImageGroupByArgs['orderBy'] }
        : { orderBy?: ServiceImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceImage model
   */
  readonly fields: ServiceImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ServiceImage model
   */
  interface ServiceImageFieldRefs {
    readonly id: FieldRef<"ServiceImage", 'String'>
    readonly createdAt: FieldRef<"ServiceImage", 'DateTime'>
    readonly url: FieldRef<"ServiceImage", 'String'>
    readonly fileName: FieldRef<"ServiceImage", 'String'>
    readonly sortOrder: FieldRef<"ServiceImage", 'Int'>
    readonly serviceId: FieldRef<"ServiceImage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ServiceImage findUnique
   */
  export type ServiceImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * Filter, which ServiceImage to fetch.
     */
    where: ServiceImageWhereUniqueInput
  }

  /**
   * ServiceImage findUniqueOrThrow
   */
  export type ServiceImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * Filter, which ServiceImage to fetch.
     */
    where: ServiceImageWhereUniqueInput
  }

  /**
   * ServiceImage findFirst
   */
  export type ServiceImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * Filter, which ServiceImage to fetch.
     */
    where?: ServiceImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceImages to fetch.
     */
    orderBy?: ServiceImageOrderByWithRelationInput | ServiceImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceImages.
     */
    cursor?: ServiceImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceImages.
     */
    distinct?: ServiceImageScalarFieldEnum | ServiceImageScalarFieldEnum[]
  }

  /**
   * ServiceImage findFirstOrThrow
   */
  export type ServiceImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * Filter, which ServiceImage to fetch.
     */
    where?: ServiceImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceImages to fetch.
     */
    orderBy?: ServiceImageOrderByWithRelationInput | ServiceImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceImages.
     */
    cursor?: ServiceImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceImages.
     */
    distinct?: ServiceImageScalarFieldEnum | ServiceImageScalarFieldEnum[]
  }

  /**
   * ServiceImage findMany
   */
  export type ServiceImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * Filter, which ServiceImages to fetch.
     */
    where?: ServiceImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceImages to fetch.
     */
    orderBy?: ServiceImageOrderByWithRelationInput | ServiceImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceImages.
     */
    cursor?: ServiceImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceImages.
     */
    skip?: number
    distinct?: ServiceImageScalarFieldEnum | ServiceImageScalarFieldEnum[]
  }

  /**
   * ServiceImage create
   */
  export type ServiceImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceImage.
     */
    data: XOR<ServiceImageCreateInput, ServiceImageUncheckedCreateInput>
  }

  /**
   * ServiceImage createMany
   */
  export type ServiceImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceImages.
     */
    data: ServiceImageCreateManyInput | ServiceImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceImage createManyAndReturn
   */
  export type ServiceImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceImages.
     */
    data: ServiceImageCreateManyInput | ServiceImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceImage update
   */
  export type ServiceImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceImage.
     */
    data: XOR<ServiceImageUpdateInput, ServiceImageUncheckedUpdateInput>
    /**
     * Choose, which ServiceImage to update.
     */
    where: ServiceImageWhereUniqueInput
  }

  /**
   * ServiceImage updateMany
   */
  export type ServiceImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceImages.
     */
    data: XOR<ServiceImageUpdateManyMutationInput, ServiceImageUncheckedUpdateManyInput>
    /**
     * Filter which ServiceImages to update
     */
    where?: ServiceImageWhereInput
    /**
     * Limit how many ServiceImages to update.
     */
    limit?: number
  }

  /**
   * ServiceImage updateManyAndReturn
   */
  export type ServiceImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * The data used to update ServiceImages.
     */
    data: XOR<ServiceImageUpdateManyMutationInput, ServiceImageUncheckedUpdateManyInput>
    /**
     * Filter which ServiceImages to update
     */
    where?: ServiceImageWhereInput
    /**
     * Limit how many ServiceImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceImage upsert
   */
  export type ServiceImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceImage to update in case it exists.
     */
    where: ServiceImageWhereUniqueInput
    /**
     * In case the ServiceImage found by the `where` argument doesn't exist, create a new ServiceImage with this data.
     */
    create: XOR<ServiceImageCreateInput, ServiceImageUncheckedCreateInput>
    /**
     * In case the ServiceImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceImageUpdateInput, ServiceImageUncheckedUpdateInput>
  }

  /**
   * ServiceImage delete
   */
  export type ServiceImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
    /**
     * Filter which ServiceImage to delete.
     */
    where: ServiceImageWhereUniqueInput
  }

  /**
   * ServiceImage deleteMany
   */
  export type ServiceImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceImages to delete
     */
    where?: ServiceImageWhereInput
    /**
     * Limit how many ServiceImages to delete.
     */
    limit?: number
  }

  /**
   * ServiceImage without action
   */
  export type ServiceImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceImage
     */
    select?: ServiceImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceImage
     */
    omit?: ServiceImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceImageInclude<ExtArgs> | null
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
    emailVerificationOtp: 'emailVerificationOtp',
    emailVerificationExpires: 'emailVerificationExpires',
    emailVerificationAttempts: 'emailVerificationAttempts',
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
    imageUrl: 'imageUrl',
    isActive: 'isActive',
    featured: 'featured',
    parentCategoryId: 'parentCategoryId'
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


  export const PhoneVerificationScalarFieldEnum: {
    id: 'id',
    phoneNumber: 'phoneNumber',
    otpCode: 'otpCode',
    attempts: 'attempts',
    maxAttempts: 'maxAttempts',
    expiresAt: 'expiresAt',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PhoneVerificationScalarFieldEnum = (typeof PhoneVerificationScalarFieldEnum)[keyof typeof PhoneVerificationScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    slug: 'slug',
    overview: 'overview',
    coverImage: 'coverImage',
    tags: 'tags',
    status: 'status',
    providerId: 'providerId',
    categoryId: 'categoryId'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const ServicePlanScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    price: 'price',
    inclusions: 'inclusions',
    isPopular: 'isPopular',
    sortOrder: 'sortOrder',
    serviceId: 'serviceId'
  };

  export type ServicePlanScalarFieldEnum = (typeof ServicePlanScalarFieldEnum)[keyof typeof ServicePlanScalarFieldEnum]


  export const ServiceAddonScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    description: 'description',
    price: 'price',
    serviceId: 'serviceId'
  };

  export type ServiceAddonScalarFieldEnum = (typeof ServiceAddonScalarFieldEnum)[keyof typeof ServiceAddonScalarFieldEnum]


  export const ServiceImageScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    url: 'url',
    fileName: 'fileName',
    sortOrder: 'sortOrder',
    serviceId: 'serviceId'
  };

  export type ServiceImageScalarFieldEnum = (typeof ServiceImageScalarFieldEnum)[keyof typeof ServiceImageScalarFieldEnum]


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
   * Reference to a field of type 'ServiceStatus'
   */
  export type EnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus'>
    


  /**
   * Reference to a field of type 'ServiceStatus[]'
   */
  export type ListEnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    
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
    emailVerificationOtp?: StringNullableFilter<"User"> | string | null
    emailVerificationExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    emailVerificationAttempts?: IntFilter<"User"> | number
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
    services?: ServiceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    emailVerificationOtp?: SortOrderInput | SortOrder
    emailVerificationExpires?: SortOrderInput | SortOrder
    emailVerificationAttempts?: SortOrder
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
    services?: ServiceOrderByRelationAggregateInput
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
    emailVerificationOtp?: StringNullableFilter<"User"> | string | null
    emailVerificationExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    emailVerificationAttempts?: IntFilter<"User"> | number
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
    services?: ServiceListRelationFilter
  }, "id" | "email" | "username" | "googleId" | "appleId" | "facebookId" | "twitterId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    emailVerificationOtp?: SortOrderInput | SortOrder
    emailVerificationExpires?: SortOrderInput | SortOrder
    emailVerificationAttempts?: SortOrder
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
    emailVerificationOtp?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerificationExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    emailVerificationAttempts?: IntWithAggregatesFilter<"User"> | number
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
    imageUrl?: StringNullableFilter<"Category"> | string | null
    isActive?: BoolFilter<"Category"> | boolean
    featured?: BoolFilter<"Category"> | boolean
    parentCategoryId?: StringNullableFilter<"Category"> | string | null
    parentCategory?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    subCategories?: CategoryListRelationFilter
    userInterests?: UserInterestListRelationFilter
    services?: ServiceListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    featured?: SortOrder
    parentCategoryId?: SortOrderInput | SortOrder
    parentCategory?: CategoryOrderByWithRelationInput
    subCategories?: CategoryOrderByRelationAggregateInput
    userInterests?: UserInterestOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
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
    imageUrl?: StringNullableFilter<"Category"> | string | null
    isActive?: BoolFilter<"Category"> | boolean
    featured?: BoolFilter<"Category"> | boolean
    parentCategoryId?: StringNullableFilter<"Category"> | string | null
    parentCategory?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    subCategories?: CategoryListRelationFilter
    userInterests?: UserInterestListRelationFilter
    services?: ServiceListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    featured?: SortOrder
    parentCategoryId?: SortOrderInput | SortOrder
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
    imageUrl?: StringNullableWithAggregatesFilter<"Category"> | string | null
    isActive?: BoolWithAggregatesFilter<"Category"> | boolean
    featured?: BoolWithAggregatesFilter<"Category"> | boolean
    parentCategoryId?: StringNullableWithAggregatesFilter<"Category"> | string | null
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

  export type PhoneVerificationWhereInput = {
    AND?: PhoneVerificationWhereInput | PhoneVerificationWhereInput[]
    OR?: PhoneVerificationWhereInput[]
    NOT?: PhoneVerificationWhereInput | PhoneVerificationWhereInput[]
    id?: StringFilter<"PhoneVerification"> | string
    phoneNumber?: StringFilter<"PhoneVerification"> | string
    otpCode?: StringFilter<"PhoneVerification"> | string
    attempts?: IntFilter<"PhoneVerification"> | number
    maxAttempts?: IntFilter<"PhoneVerification"> | number
    expiresAt?: DateTimeFilter<"PhoneVerification"> | Date | string
    verified?: BoolFilter<"PhoneVerification"> | boolean
    createdAt?: DateTimeFilter<"PhoneVerification"> | Date | string
    updatedAt?: DateTimeFilter<"PhoneVerification"> | Date | string
  }

  export type PhoneVerificationOrderByWithRelationInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    otpCode?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    expiresAt?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhoneVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PhoneVerificationWhereInput | PhoneVerificationWhereInput[]
    OR?: PhoneVerificationWhereInput[]
    NOT?: PhoneVerificationWhereInput | PhoneVerificationWhereInput[]
    phoneNumber?: StringFilter<"PhoneVerification"> | string
    otpCode?: StringFilter<"PhoneVerification"> | string
    attempts?: IntFilter<"PhoneVerification"> | number
    maxAttempts?: IntFilter<"PhoneVerification"> | number
    expiresAt?: DateTimeFilter<"PhoneVerification"> | Date | string
    verified?: BoolFilter<"PhoneVerification"> | boolean
    createdAt?: DateTimeFilter<"PhoneVerification"> | Date | string
    updatedAt?: DateTimeFilter<"PhoneVerification"> | Date | string
  }, "id">

  export type PhoneVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    otpCode?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    expiresAt?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PhoneVerificationCountOrderByAggregateInput
    _avg?: PhoneVerificationAvgOrderByAggregateInput
    _max?: PhoneVerificationMaxOrderByAggregateInput
    _min?: PhoneVerificationMinOrderByAggregateInput
    _sum?: PhoneVerificationSumOrderByAggregateInput
  }

  export type PhoneVerificationScalarWhereWithAggregatesInput = {
    AND?: PhoneVerificationScalarWhereWithAggregatesInput | PhoneVerificationScalarWhereWithAggregatesInput[]
    OR?: PhoneVerificationScalarWhereWithAggregatesInput[]
    NOT?: PhoneVerificationScalarWhereWithAggregatesInput | PhoneVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PhoneVerification"> | string
    phoneNumber?: StringWithAggregatesFilter<"PhoneVerification"> | string
    otpCode?: StringWithAggregatesFilter<"PhoneVerification"> | string
    attempts?: IntWithAggregatesFilter<"PhoneVerification"> | number
    maxAttempts?: IntWithAggregatesFilter<"PhoneVerification"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"PhoneVerification"> | Date | string
    verified?: BoolWithAggregatesFilter<"PhoneVerification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PhoneVerification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PhoneVerification"> | Date | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    title?: StringFilter<"Service"> | string
    slug?: StringFilter<"Service"> | string
    overview?: StringFilter<"Service"> | string
    coverImage?: StringNullableFilter<"Service"> | string | null
    tags?: StringNullableListFilter<"Service">
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    providerId?: StringFilter<"Service"> | string
    categoryId?: StringFilter<"Service"> | string
    provider?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    plans?: ServicePlanListRelationFilter
    addons?: ServiceAddonListRelationFilter
    images?: ServiceImageListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    overview?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    providerId?: SortOrder
    categoryId?: SortOrder
    provider?: UserOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    plans?: ServicePlanOrderByRelationAggregateInput
    addons?: ServiceAddonOrderByRelationAggregateInput
    images?: ServiceImageOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    title?: StringFilter<"Service"> | string
    overview?: StringFilter<"Service"> | string
    coverImage?: StringNullableFilter<"Service"> | string | null
    tags?: StringNullableListFilter<"Service">
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    providerId?: StringFilter<"Service"> | string
    categoryId?: StringFilter<"Service"> | string
    provider?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
    plans?: ServicePlanListRelationFilter
    addons?: ServiceAddonListRelationFilter
    images?: ServiceImageListRelationFilter
  }, "id" | "slug">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    overview?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    providerId?: SortOrder
    categoryId?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    title?: StringWithAggregatesFilter<"Service"> | string
    slug?: StringWithAggregatesFilter<"Service"> | string
    overview?: StringWithAggregatesFilter<"Service"> | string
    coverImage?: StringNullableWithAggregatesFilter<"Service"> | string | null
    tags?: StringNullableListFilter<"Service">
    status?: EnumServiceStatusWithAggregatesFilter<"Service"> | $Enums.ServiceStatus
    providerId?: StringWithAggregatesFilter<"Service"> | string
    categoryId?: StringWithAggregatesFilter<"Service"> | string
  }

  export type ServicePlanWhereInput = {
    AND?: ServicePlanWhereInput | ServicePlanWhereInput[]
    OR?: ServicePlanWhereInput[]
    NOT?: ServicePlanWhereInput | ServicePlanWhereInput[]
    id?: StringFilter<"ServicePlan"> | string
    createdAt?: DateTimeFilter<"ServicePlan"> | Date | string
    updatedAt?: DateTimeFilter<"ServicePlan"> | Date | string
    title?: StringFilter<"ServicePlan"> | string
    price?: DecimalFilter<"ServicePlan"> | Decimal | DecimalJsLike | number | string
    inclusions?: StringFilter<"ServicePlan"> | string
    isPopular?: BoolFilter<"ServicePlan"> | boolean
    sortOrder?: IntFilter<"ServicePlan"> | number
    serviceId?: StringFilter<"ServicePlan"> | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type ServicePlanOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    price?: SortOrder
    inclusions?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
    service?: ServiceOrderByWithRelationInput
  }

  export type ServicePlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServicePlanWhereInput | ServicePlanWhereInput[]
    OR?: ServicePlanWhereInput[]
    NOT?: ServicePlanWhereInput | ServicePlanWhereInput[]
    createdAt?: DateTimeFilter<"ServicePlan"> | Date | string
    updatedAt?: DateTimeFilter<"ServicePlan"> | Date | string
    title?: StringFilter<"ServicePlan"> | string
    price?: DecimalFilter<"ServicePlan"> | Decimal | DecimalJsLike | number | string
    inclusions?: StringFilter<"ServicePlan"> | string
    isPopular?: BoolFilter<"ServicePlan"> | boolean
    sortOrder?: IntFilter<"ServicePlan"> | number
    serviceId?: StringFilter<"ServicePlan"> | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type ServicePlanOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    price?: SortOrder
    inclusions?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
    _count?: ServicePlanCountOrderByAggregateInput
    _avg?: ServicePlanAvgOrderByAggregateInput
    _max?: ServicePlanMaxOrderByAggregateInput
    _min?: ServicePlanMinOrderByAggregateInput
    _sum?: ServicePlanSumOrderByAggregateInput
  }

  export type ServicePlanScalarWhereWithAggregatesInput = {
    AND?: ServicePlanScalarWhereWithAggregatesInput | ServicePlanScalarWhereWithAggregatesInput[]
    OR?: ServicePlanScalarWhereWithAggregatesInput[]
    NOT?: ServicePlanScalarWhereWithAggregatesInput | ServicePlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServicePlan"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ServicePlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServicePlan"> | Date | string
    title?: StringWithAggregatesFilter<"ServicePlan"> | string
    price?: DecimalWithAggregatesFilter<"ServicePlan"> | Decimal | DecimalJsLike | number | string
    inclusions?: StringWithAggregatesFilter<"ServicePlan"> | string
    isPopular?: BoolWithAggregatesFilter<"ServicePlan"> | boolean
    sortOrder?: IntWithAggregatesFilter<"ServicePlan"> | number
    serviceId?: StringWithAggregatesFilter<"ServicePlan"> | string
  }

  export type ServiceAddonWhereInput = {
    AND?: ServiceAddonWhereInput | ServiceAddonWhereInput[]
    OR?: ServiceAddonWhereInput[]
    NOT?: ServiceAddonWhereInput | ServiceAddonWhereInput[]
    id?: StringFilter<"ServiceAddon"> | string
    createdAt?: DateTimeFilter<"ServiceAddon"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceAddon"> | Date | string
    title?: StringFilter<"ServiceAddon"> | string
    description?: StringNullableFilter<"ServiceAddon"> | string | null
    price?: DecimalFilter<"ServiceAddon"> | Decimal | DecimalJsLike | number | string
    serviceId?: StringFilter<"ServiceAddon"> | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type ServiceAddonOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    serviceId?: SortOrder
    service?: ServiceOrderByWithRelationInput
  }

  export type ServiceAddonWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceAddonWhereInput | ServiceAddonWhereInput[]
    OR?: ServiceAddonWhereInput[]
    NOT?: ServiceAddonWhereInput | ServiceAddonWhereInput[]
    createdAt?: DateTimeFilter<"ServiceAddon"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceAddon"> | Date | string
    title?: StringFilter<"ServiceAddon"> | string
    description?: StringNullableFilter<"ServiceAddon"> | string | null
    price?: DecimalFilter<"ServiceAddon"> | Decimal | DecimalJsLike | number | string
    serviceId?: StringFilter<"ServiceAddon"> | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type ServiceAddonOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    serviceId?: SortOrder
    _count?: ServiceAddonCountOrderByAggregateInput
    _avg?: ServiceAddonAvgOrderByAggregateInput
    _max?: ServiceAddonMaxOrderByAggregateInput
    _min?: ServiceAddonMinOrderByAggregateInput
    _sum?: ServiceAddonSumOrderByAggregateInput
  }

  export type ServiceAddonScalarWhereWithAggregatesInput = {
    AND?: ServiceAddonScalarWhereWithAggregatesInput | ServiceAddonScalarWhereWithAggregatesInput[]
    OR?: ServiceAddonScalarWhereWithAggregatesInput[]
    NOT?: ServiceAddonScalarWhereWithAggregatesInput | ServiceAddonScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceAddon"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ServiceAddon"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceAddon"> | Date | string
    title?: StringWithAggregatesFilter<"ServiceAddon"> | string
    description?: StringNullableWithAggregatesFilter<"ServiceAddon"> | string | null
    price?: DecimalWithAggregatesFilter<"ServiceAddon"> | Decimal | DecimalJsLike | number | string
    serviceId?: StringWithAggregatesFilter<"ServiceAddon"> | string
  }

  export type ServiceImageWhereInput = {
    AND?: ServiceImageWhereInput | ServiceImageWhereInput[]
    OR?: ServiceImageWhereInput[]
    NOT?: ServiceImageWhereInput | ServiceImageWhereInput[]
    id?: StringFilter<"ServiceImage"> | string
    createdAt?: DateTimeFilter<"ServiceImage"> | Date | string
    url?: StringFilter<"ServiceImage"> | string
    fileName?: StringFilter<"ServiceImage"> | string
    sortOrder?: IntFilter<"ServiceImage"> | number
    serviceId?: StringFilter<"ServiceImage"> | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type ServiceImageOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    url?: SortOrder
    fileName?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
    service?: ServiceOrderByWithRelationInput
  }

  export type ServiceImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceImageWhereInput | ServiceImageWhereInput[]
    OR?: ServiceImageWhereInput[]
    NOT?: ServiceImageWhereInput | ServiceImageWhereInput[]
    createdAt?: DateTimeFilter<"ServiceImage"> | Date | string
    url?: StringFilter<"ServiceImage"> | string
    fileName?: StringFilter<"ServiceImage"> | string
    sortOrder?: IntFilter<"ServiceImage"> | number
    serviceId?: StringFilter<"ServiceImage"> | string
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type ServiceImageOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    url?: SortOrder
    fileName?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
    _count?: ServiceImageCountOrderByAggregateInput
    _avg?: ServiceImageAvgOrderByAggregateInput
    _max?: ServiceImageMaxOrderByAggregateInput
    _min?: ServiceImageMinOrderByAggregateInput
    _sum?: ServiceImageSumOrderByAggregateInput
  }

  export type ServiceImageScalarWhereWithAggregatesInput = {
    AND?: ServiceImageScalarWhereWithAggregatesInput | ServiceImageScalarWhereWithAggregatesInput[]
    OR?: ServiceImageScalarWhereWithAggregatesInput[]
    NOT?: ServiceImageScalarWhereWithAggregatesInput | ServiceImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceImage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ServiceImage"> | Date | string
    url?: StringWithAggregatesFilter<"ServiceImage"> | string
    fileName?: StringWithAggregatesFilter<"ServiceImage"> | string
    sortOrder?: IntWithAggregatesFilter<"ServiceImage"> | number
    serviceId?: StringWithAggregatesFilter<"ServiceImage"> | string
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    services?: ServiceCreateNestedManyWithoutProviderInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    services?: ServiceUncheckedCreateNestedManyWithoutProviderInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    services?: ServiceUpdateManyWithoutProviderNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    services?: ServiceUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategory?: CategoryCreateNestedOneWithoutSubCategoriesInput
    subCategories?: CategoryCreateNestedManyWithoutParentCategoryInput
    userInterests?: UserInterestCreateNestedManyWithoutCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: string | null
    subCategories?: CategoryUncheckedCreateNestedManyWithoutParentCategoryInput
    userInterests?: UserInterestUncheckedCreateNestedManyWithoutCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategory?: CategoryUpdateOneWithoutSubCategoriesNestedInput
    subCategories?: CategoryUpdateManyWithoutParentCategoryNestedInput
    userInterests?: UserInterestUpdateManyWithoutCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    subCategories?: CategoryUncheckedUpdateManyWithoutParentCategoryNestedInput
    userInterests?: UserInterestUncheckedUpdateManyWithoutCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: string | null
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type PhoneVerificationCreateInput = {
    id?: string
    phoneNumber: string
    otpCode: string
    attempts?: number
    maxAttempts?: number
    expiresAt: Date | string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhoneVerificationUncheckedCreateInput = {
    id?: string
    phoneNumber: string
    otpCode: string
    attempts?: number
    maxAttempts?: number
    expiresAt: Date | string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhoneVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    otpCode?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhoneVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    otpCode?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhoneVerificationCreateManyInput = {
    id?: string
    phoneNumber: string
    otpCode: string
    attempts?: number
    maxAttempts?: number
    expiresAt: Date | string
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PhoneVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    otpCode?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PhoneVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    otpCode?: StringFieldUpdateOperationsInput | string
    attempts?: IntFieldUpdateOperationsInput | number
    maxAttempts?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    provider: UserCreateNestedOneWithoutServicesInput
    category: CategoryCreateNestedOneWithoutServicesInput
    plans?: ServicePlanCreateNestedManyWithoutServiceInput
    addons?: ServiceAddonCreateNestedManyWithoutServiceInput
    images?: ServiceImageCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    providerId: string
    categoryId: string
    plans?: ServicePlanUncheckedCreateNestedManyWithoutServiceInput
    addons?: ServiceAddonUncheckedCreateNestedManyWithoutServiceInput
    images?: ServiceImageUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    provider?: UserUpdateOneRequiredWithoutServicesNestedInput
    category?: CategoryUpdateOneRequiredWithoutServicesNestedInput
    plans?: ServicePlanUpdateManyWithoutServiceNestedInput
    addons?: ServiceAddonUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    providerId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    plans?: ServicePlanUncheckedUpdateManyWithoutServiceNestedInput
    addons?: ServiceAddonUncheckedUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    providerId: string
    categoryId: string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    providerId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ServicePlanCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    price: Decimal | DecimalJsLike | number | string
    inclusions: string
    isPopular?: boolean
    sortOrder?: number
    service: ServiceCreateNestedOneWithoutPlansInput
  }

  export type ServicePlanUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    price: Decimal | DecimalJsLike | number | string
    inclusions: string
    isPopular?: boolean
    sortOrder?: number
    serviceId: string
  }

  export type ServicePlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    inclusions?: StringFieldUpdateOperationsInput | string
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    service?: ServiceUpdateOneRequiredWithoutPlansNestedInput
  }

  export type ServicePlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    inclusions?: StringFieldUpdateOperationsInput | string
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type ServicePlanCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    price: Decimal | DecimalJsLike | number | string
    inclusions: string
    isPopular?: boolean
    sortOrder?: number
    serviceId: string
  }

  export type ServicePlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    inclusions?: StringFieldUpdateOperationsInput | string
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ServicePlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    inclusions?: StringFieldUpdateOperationsInput | string
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceAddonCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    service: ServiceCreateNestedOneWithoutAddonsInput
  }

  export type ServiceAddonUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    serviceId: string
  }

  export type ServiceAddonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    service?: ServiceUpdateOneRequiredWithoutAddonsNestedInput
  }

  export type ServiceAddonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceAddonCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    serviceId: string
  }

  export type ServiceAddonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ServiceAddonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceImageCreateInput = {
    id?: string
    createdAt?: Date | string
    url: string
    fileName: string
    sortOrder?: number
    service: ServiceCreateNestedOneWithoutImagesInput
  }

  export type ServiceImageUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    url: string
    fileName: string
    sortOrder?: number
    serviceId: string
  }

  export type ServiceImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    service?: ServiceUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ServiceImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceImageCreateManyInput = {
    id?: string
    createdAt?: Date | string
    url: string
    fileName: string
    sortOrder?: number
    serviceId: string
  }

  export type ServiceImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
    serviceId?: StringFieldUpdateOperationsInput | string
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

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
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

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    emailVerificationOtp?: SortOrder
    emailVerificationExpires?: SortOrder
    emailVerificationAttempts?: SortOrder
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
    emailVerificationAttempts?: SortOrder
    passwordResetAttempts?: SortOrder
    profileCompleteness?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    emailVerificationOtp?: SortOrder
    emailVerificationExpires?: SortOrder
    emailVerificationAttempts?: SortOrder
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
    emailVerificationOtp?: SortOrder
    emailVerificationExpires?: SortOrder
    emailVerificationAttempts?: SortOrder
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
    emailVerificationAttempts?: SortOrder
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

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    featured?: SortOrder
    parentCategoryId?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    featured?: SortOrder
    parentCategoryId?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    isActive?: SortOrder
    featured?: SortOrder
    parentCategoryId?: SortOrder
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

  export type PhoneVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    otpCode?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    expiresAt?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhoneVerificationAvgOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
  }

  export type PhoneVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    otpCode?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    expiresAt?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhoneVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    phoneNumber?: SortOrder
    otpCode?: SortOrder
    attempts?: SortOrder
    maxAttempts?: SortOrder
    expiresAt?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PhoneVerificationSumOrderByAggregateInput = {
    attempts?: SortOrder
    maxAttempts?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type ServicePlanListRelationFilter = {
    every?: ServicePlanWhereInput
    some?: ServicePlanWhereInput
    none?: ServicePlanWhereInput
  }

  export type ServiceAddonListRelationFilter = {
    every?: ServiceAddonWhereInput
    some?: ServiceAddonWhereInput
    none?: ServiceAddonWhereInput
  }

  export type ServiceImageListRelationFilter = {
    every?: ServiceImageWhereInput
    some?: ServiceImageWhereInput
    none?: ServiceImageWhereInput
  }

  export type ServicePlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceAddonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    overview?: SortOrder
    coverImage?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    providerId?: SortOrder
    categoryId?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    overview?: SortOrder
    coverImage?: SortOrder
    status?: SortOrder
    providerId?: SortOrder
    categoryId?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    overview?: SortOrder
    coverImage?: SortOrder
    status?: SortOrder
    providerId?: SortOrder
    categoryId?: SortOrder
  }

  export type EnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type ServicePlanCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    price?: SortOrder
    inclusions?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
  }

  export type ServicePlanAvgOrderByAggregateInput = {
    price?: SortOrder
    sortOrder?: SortOrder
  }

  export type ServicePlanMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    price?: SortOrder
    inclusions?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
  }

  export type ServicePlanMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    price?: SortOrder
    inclusions?: SortOrder
    isPopular?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
  }

  export type ServicePlanSumOrderByAggregateInput = {
    price?: SortOrder
    sortOrder?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ServiceAddonCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    serviceId?: SortOrder
  }

  export type ServiceAddonAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ServiceAddonMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    serviceId?: SortOrder
  }

  export type ServiceAddonMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    description?: SortOrder
    price?: SortOrder
    serviceId?: SortOrder
  }

  export type ServiceAddonSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ServiceImageCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    url?: SortOrder
    fileName?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
  }

  export type ServiceImageAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type ServiceImageMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    url?: SortOrder
    fileName?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
  }

  export type ServiceImageMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    url?: SortOrder
    fileName?: SortOrder
    sortOrder?: SortOrder
    serviceId?: SortOrder
  }

  export type ServiceImageSumOrderByAggregateInput = {
    sortOrder?: SortOrder
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

  export type ServiceCreateNestedManyWithoutProviderInput = {
    create?: XOR<ServiceCreateWithoutProviderInput, ServiceUncheckedCreateWithoutProviderInput> | ServiceCreateWithoutProviderInput[] | ServiceUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutProviderInput | ServiceCreateOrConnectWithoutProviderInput[]
    createMany?: ServiceCreateManyProviderInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
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

  export type ServiceUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<ServiceCreateWithoutProviderInput, ServiceUncheckedCreateWithoutProviderInput> | ServiceCreateWithoutProviderInput[] | ServiceUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutProviderInput | ServiceCreateOrConnectWithoutProviderInput[]
    createMany?: ServiceCreateManyProviderInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
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

  export type ServiceUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ServiceCreateWithoutProviderInput, ServiceUncheckedCreateWithoutProviderInput> | ServiceCreateWithoutProviderInput[] | ServiceUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutProviderInput | ServiceCreateOrConnectWithoutProviderInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutProviderInput | ServiceUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ServiceCreateManyProviderInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutProviderInput | ServiceUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutProviderInput | ServiceUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
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

  export type ServiceUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ServiceCreateWithoutProviderInput, ServiceUncheckedCreateWithoutProviderInput> | ServiceCreateWithoutProviderInput[] | ServiceUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutProviderInput | ServiceCreateOrConnectWithoutProviderInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutProviderInput | ServiceUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ServiceCreateManyProviderInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutProviderInput | ServiceUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutProviderInput | ServiceUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
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

  export type CategoryCreateNestedOneWithoutSubCategoriesInput = {
    create?: XOR<CategoryCreateWithoutSubCategoriesInput, CategoryUncheckedCreateWithoutSubCategoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutSubCategoriesInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutParentCategoryInput = {
    create?: XOR<CategoryCreateWithoutParentCategoryInput, CategoryUncheckedCreateWithoutParentCategoryInput> | CategoryCreateWithoutParentCategoryInput[] | CategoryUncheckedCreateWithoutParentCategoryInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentCategoryInput | CategoryCreateOrConnectWithoutParentCategoryInput[]
    createMany?: CategoryCreateManyParentCategoryInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type UserInterestCreateNestedManyWithoutCategoryInput = {
    create?: XOR<UserInterestCreateWithoutCategoryInput, UserInterestUncheckedCreateWithoutCategoryInput> | UserInterestCreateWithoutCategoryInput[] | UserInterestUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutCategoryInput | UserInterestCreateOrConnectWithoutCategoryInput[]
    createMany?: UserInterestCreateManyCategoryInputEnvelope
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutParentCategoryInput = {
    create?: XOR<CategoryCreateWithoutParentCategoryInput, CategoryUncheckedCreateWithoutParentCategoryInput> | CategoryCreateWithoutParentCategoryInput[] | CategoryUncheckedCreateWithoutParentCategoryInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentCategoryInput | CategoryCreateOrConnectWithoutParentCategoryInput[]
    createMany?: CategoryCreateManyParentCategoryInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type UserInterestUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<UserInterestCreateWithoutCategoryInput, UserInterestUncheckedCreateWithoutCategoryInput> | UserInterestCreateWithoutCategoryInput[] | UserInterestUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: UserInterestCreateOrConnectWithoutCategoryInput | UserInterestCreateOrConnectWithoutCategoryInput[]
    createMany?: UserInterestCreateManyCategoryInputEnvelope
    connect?: UserInterestWhereUniqueInput | UserInterestWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type CategoryUpdateOneWithoutSubCategoriesNestedInput = {
    create?: XOR<CategoryCreateWithoutSubCategoriesInput, CategoryUncheckedCreateWithoutSubCategoriesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutSubCategoriesInput
    upsert?: CategoryUpsertWithoutSubCategoriesInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutSubCategoriesInput, CategoryUpdateWithoutSubCategoriesInput>, CategoryUncheckedUpdateWithoutSubCategoriesInput>
  }

  export type CategoryUpdateManyWithoutParentCategoryNestedInput = {
    create?: XOR<CategoryCreateWithoutParentCategoryInput, CategoryUncheckedCreateWithoutParentCategoryInput> | CategoryCreateWithoutParentCategoryInput[] | CategoryUncheckedCreateWithoutParentCategoryInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentCategoryInput | CategoryCreateOrConnectWithoutParentCategoryInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentCategoryInput | CategoryUpsertWithWhereUniqueWithoutParentCategoryInput[]
    createMany?: CategoryCreateManyParentCategoryInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentCategoryInput | CategoryUpdateWithWhereUniqueWithoutParentCategoryInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentCategoryInput | CategoryUpdateManyWithWhereWithoutParentCategoryInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
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

  export type ServiceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutParentCategoryNestedInput = {
    create?: XOR<CategoryCreateWithoutParentCategoryInput, CategoryUncheckedCreateWithoutParentCategoryInput> | CategoryCreateWithoutParentCategoryInput[] | CategoryUncheckedCreateWithoutParentCategoryInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentCategoryInput | CategoryCreateOrConnectWithoutParentCategoryInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentCategoryInput | CategoryUpsertWithWhereUniqueWithoutParentCategoryInput[]
    createMany?: CategoryCreateManyParentCategoryInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentCategoryInput | CategoryUpdateWithWhereUniqueWithoutParentCategoryInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentCategoryInput | CategoryUpdateManyWithWhereWithoutParentCategoryInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
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

  export type ServiceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
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

  export type ServiceCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutServicesInput = {
    create?: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutServicesInput = {
    create?: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutServicesInput
    connect?: CategoryWhereUniqueInput
  }

  export type ServicePlanCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServicePlanCreateWithoutServiceInput, ServicePlanUncheckedCreateWithoutServiceInput> | ServicePlanCreateWithoutServiceInput[] | ServicePlanUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServicePlanCreateOrConnectWithoutServiceInput | ServicePlanCreateOrConnectWithoutServiceInput[]
    createMany?: ServicePlanCreateManyServiceInputEnvelope
    connect?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
  }

  export type ServiceAddonCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceAddonCreateWithoutServiceInput, ServiceAddonUncheckedCreateWithoutServiceInput> | ServiceAddonCreateWithoutServiceInput[] | ServiceAddonUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceAddonCreateOrConnectWithoutServiceInput | ServiceAddonCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceAddonCreateManyServiceInputEnvelope
    connect?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
  }

  export type ServiceImageCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceImageCreateWithoutServiceInput, ServiceImageUncheckedCreateWithoutServiceInput> | ServiceImageCreateWithoutServiceInput[] | ServiceImageUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceImageCreateOrConnectWithoutServiceInput | ServiceImageCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceImageCreateManyServiceInputEnvelope
    connect?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
  }

  export type ServicePlanUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServicePlanCreateWithoutServiceInput, ServicePlanUncheckedCreateWithoutServiceInput> | ServicePlanCreateWithoutServiceInput[] | ServicePlanUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServicePlanCreateOrConnectWithoutServiceInput | ServicePlanCreateOrConnectWithoutServiceInput[]
    createMany?: ServicePlanCreateManyServiceInputEnvelope
    connect?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
  }

  export type ServiceAddonUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceAddonCreateWithoutServiceInput, ServiceAddonUncheckedCreateWithoutServiceInput> | ServiceAddonCreateWithoutServiceInput[] | ServiceAddonUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceAddonCreateOrConnectWithoutServiceInput | ServiceAddonCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceAddonCreateManyServiceInputEnvelope
    connect?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
  }

  export type ServiceImageUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<ServiceImageCreateWithoutServiceInput, ServiceImageUncheckedCreateWithoutServiceInput> | ServiceImageCreateWithoutServiceInput[] | ServiceImageUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceImageCreateOrConnectWithoutServiceInput | ServiceImageCreateOrConnectWithoutServiceInput[]
    createMany?: ServiceImageCreateManyServiceInputEnvelope
    connect?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
  }

  export type ServiceUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceStatus
  }

  export type UserUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesInput
    upsert?: UserUpsertWithoutServicesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServicesInput, UserUpdateWithoutServicesInput>, UserUncheckedUpdateWithoutServicesInput>
  }

  export type CategoryUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutServicesInput
    upsert?: CategoryUpsertWithoutServicesInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutServicesInput, CategoryUpdateWithoutServicesInput>, CategoryUncheckedUpdateWithoutServicesInput>
  }

  export type ServicePlanUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServicePlanCreateWithoutServiceInput, ServicePlanUncheckedCreateWithoutServiceInput> | ServicePlanCreateWithoutServiceInput[] | ServicePlanUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServicePlanCreateOrConnectWithoutServiceInput | ServicePlanCreateOrConnectWithoutServiceInput[]
    upsert?: ServicePlanUpsertWithWhereUniqueWithoutServiceInput | ServicePlanUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServicePlanCreateManyServiceInputEnvelope
    set?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
    disconnect?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
    delete?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
    connect?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
    update?: ServicePlanUpdateWithWhereUniqueWithoutServiceInput | ServicePlanUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServicePlanUpdateManyWithWhereWithoutServiceInput | ServicePlanUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServicePlanScalarWhereInput | ServicePlanScalarWhereInput[]
  }

  export type ServiceAddonUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceAddonCreateWithoutServiceInput, ServiceAddonUncheckedCreateWithoutServiceInput> | ServiceAddonCreateWithoutServiceInput[] | ServiceAddonUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceAddonCreateOrConnectWithoutServiceInput | ServiceAddonCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceAddonUpsertWithWhereUniqueWithoutServiceInput | ServiceAddonUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceAddonCreateManyServiceInputEnvelope
    set?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
    disconnect?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
    delete?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
    connect?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
    update?: ServiceAddonUpdateWithWhereUniqueWithoutServiceInput | ServiceAddonUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceAddonUpdateManyWithWhereWithoutServiceInput | ServiceAddonUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceAddonScalarWhereInput | ServiceAddonScalarWhereInput[]
  }

  export type ServiceImageUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceImageCreateWithoutServiceInput, ServiceImageUncheckedCreateWithoutServiceInput> | ServiceImageCreateWithoutServiceInput[] | ServiceImageUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceImageCreateOrConnectWithoutServiceInput | ServiceImageCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceImageUpsertWithWhereUniqueWithoutServiceInput | ServiceImageUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceImageCreateManyServiceInputEnvelope
    set?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
    disconnect?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
    delete?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
    connect?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
    update?: ServiceImageUpdateWithWhereUniqueWithoutServiceInput | ServiceImageUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceImageUpdateManyWithWhereWithoutServiceInput | ServiceImageUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceImageScalarWhereInput | ServiceImageScalarWhereInput[]
  }

  export type ServicePlanUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServicePlanCreateWithoutServiceInput, ServicePlanUncheckedCreateWithoutServiceInput> | ServicePlanCreateWithoutServiceInput[] | ServicePlanUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServicePlanCreateOrConnectWithoutServiceInput | ServicePlanCreateOrConnectWithoutServiceInput[]
    upsert?: ServicePlanUpsertWithWhereUniqueWithoutServiceInput | ServicePlanUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServicePlanCreateManyServiceInputEnvelope
    set?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
    disconnect?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
    delete?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
    connect?: ServicePlanWhereUniqueInput | ServicePlanWhereUniqueInput[]
    update?: ServicePlanUpdateWithWhereUniqueWithoutServiceInput | ServicePlanUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServicePlanUpdateManyWithWhereWithoutServiceInput | ServicePlanUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServicePlanScalarWhereInput | ServicePlanScalarWhereInput[]
  }

  export type ServiceAddonUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceAddonCreateWithoutServiceInput, ServiceAddonUncheckedCreateWithoutServiceInput> | ServiceAddonCreateWithoutServiceInput[] | ServiceAddonUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceAddonCreateOrConnectWithoutServiceInput | ServiceAddonCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceAddonUpsertWithWhereUniqueWithoutServiceInput | ServiceAddonUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceAddonCreateManyServiceInputEnvelope
    set?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
    disconnect?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
    delete?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
    connect?: ServiceAddonWhereUniqueInput | ServiceAddonWhereUniqueInput[]
    update?: ServiceAddonUpdateWithWhereUniqueWithoutServiceInput | ServiceAddonUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceAddonUpdateManyWithWhereWithoutServiceInput | ServiceAddonUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceAddonScalarWhereInput | ServiceAddonScalarWhereInput[]
  }

  export type ServiceImageUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<ServiceImageCreateWithoutServiceInput, ServiceImageUncheckedCreateWithoutServiceInput> | ServiceImageCreateWithoutServiceInput[] | ServiceImageUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: ServiceImageCreateOrConnectWithoutServiceInput | ServiceImageCreateOrConnectWithoutServiceInput[]
    upsert?: ServiceImageUpsertWithWhereUniqueWithoutServiceInput | ServiceImageUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: ServiceImageCreateManyServiceInputEnvelope
    set?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
    disconnect?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
    delete?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
    connect?: ServiceImageWhereUniqueInput | ServiceImageWhereUniqueInput[]
    update?: ServiceImageUpdateWithWhereUniqueWithoutServiceInput | ServiceImageUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: ServiceImageUpdateManyWithWhereWithoutServiceInput | ServiceImageUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: ServiceImageScalarWhereInput | ServiceImageScalarWhereInput[]
  }

  export type ServiceCreateNestedOneWithoutPlansInput = {
    create?: XOR<ServiceCreateWithoutPlansInput, ServiceUncheckedCreateWithoutPlansInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutPlansInput
    connect?: ServiceWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type ServiceUpdateOneRequiredWithoutPlansNestedInput = {
    create?: XOR<ServiceCreateWithoutPlansInput, ServiceUncheckedCreateWithoutPlansInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutPlansInput
    upsert?: ServiceUpsertWithoutPlansInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutPlansInput, ServiceUpdateWithoutPlansInput>, ServiceUncheckedUpdateWithoutPlansInput>
  }

  export type ServiceCreateNestedOneWithoutAddonsInput = {
    create?: XOR<ServiceCreateWithoutAddonsInput, ServiceUncheckedCreateWithoutAddonsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAddonsInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceUpdateOneRequiredWithoutAddonsNestedInput = {
    create?: XOR<ServiceCreateWithoutAddonsInput, ServiceUncheckedCreateWithoutAddonsInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutAddonsInput
    upsert?: ServiceUpsertWithoutAddonsInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutAddonsInput, ServiceUpdateWithoutAddonsInput>, ServiceUncheckedUpdateWithoutAddonsInput>
  }

  export type ServiceCreateNestedOneWithoutImagesInput = {
    create?: XOR<ServiceCreateWithoutImagesInput, ServiceUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutImagesInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ServiceCreateWithoutImagesInput, ServiceUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutImagesInput
    upsert?: ServiceUpsertWithoutImagesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutImagesInput, ServiceUpdateWithoutImagesInput>, ServiceUncheckedUpdateWithoutImagesInput>
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

  export type NestedEnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceStatus[] | ListEnumServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type ServiceCreateWithoutProviderInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    category: CategoryCreateNestedOneWithoutServicesInput
    plans?: ServicePlanCreateNestedManyWithoutServiceInput
    addons?: ServiceAddonCreateNestedManyWithoutServiceInput
    images?: ServiceImageCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutProviderInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    categoryId: string
    plans?: ServicePlanUncheckedCreateNestedManyWithoutServiceInput
    addons?: ServiceAddonUncheckedCreateNestedManyWithoutServiceInput
    images?: ServiceImageUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutProviderInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutProviderInput, ServiceUncheckedCreateWithoutProviderInput>
  }

  export type ServiceCreateManyProviderInputEnvelope = {
    data: ServiceCreateManyProviderInput | ServiceCreateManyProviderInput[]
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

  export type ServiceUpsertWithWhereUniqueWithoutProviderInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutProviderInput, ServiceUncheckedUpdateWithoutProviderInput>
    create: XOR<ServiceCreateWithoutProviderInput, ServiceUncheckedCreateWithoutProviderInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutProviderInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutProviderInput, ServiceUncheckedUpdateWithoutProviderInput>
  }

  export type ServiceUpdateManyWithWhereWithoutProviderInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutProviderInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    title?: StringFilter<"Service"> | string
    slug?: StringFilter<"Service"> | string
    overview?: StringFilter<"Service"> | string
    coverImage?: StringNullableFilter<"Service"> | string | null
    tags?: StringNullableListFilter<"Service">
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    providerId?: StringFilter<"Service"> | string
    categoryId?: StringFilter<"Service"> | string
  }

  export type UserCreateWithoutAddressesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    services?: ServiceCreateNestedManyWithoutProviderInput
  }

  export type UserUncheckedCreateWithoutAddressesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    services?: ServiceUncheckedCreateNestedManyWithoutProviderInput
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
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    services?: ServiceUpdateManyWithoutProviderNestedInput
  }

  export type UserUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    services?: ServiceUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type CategoryCreateWithoutSubCategoriesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategory?: CategoryCreateNestedOneWithoutSubCategoriesInput
    userInterests?: UserInterestCreateNestedManyWithoutCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutSubCategoriesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: string | null
    userInterests?: UserInterestUncheckedCreateNestedManyWithoutCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutSubCategoriesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutSubCategoriesInput, CategoryUncheckedCreateWithoutSubCategoriesInput>
  }

  export type CategoryCreateWithoutParentCategoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    subCategories?: CategoryCreateNestedManyWithoutParentCategoryInput
    userInterests?: UserInterestCreateNestedManyWithoutCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutParentCategoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    subCategories?: CategoryUncheckedCreateNestedManyWithoutParentCategoryInput
    userInterests?: UserInterestUncheckedCreateNestedManyWithoutCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutParentCategoryInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParentCategoryInput, CategoryUncheckedCreateWithoutParentCategoryInput>
  }

  export type CategoryCreateManyParentCategoryInputEnvelope = {
    data: CategoryCreateManyParentCategoryInput | CategoryCreateManyParentCategoryInput[]
    skipDuplicates?: boolean
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

  export type ServiceCreateWithoutCategoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    provider: UserCreateNestedOneWithoutServicesInput
    plans?: ServicePlanCreateNestedManyWithoutServiceInput
    addons?: ServiceAddonCreateNestedManyWithoutServiceInput
    images?: ServiceImageCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutCategoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    providerId: string
    plans?: ServicePlanUncheckedCreateNestedManyWithoutServiceInput
    addons?: ServiceAddonUncheckedCreateNestedManyWithoutServiceInput
    images?: ServiceImageUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceCreateManyCategoryInputEnvelope = {
    data: ServiceCreateManyCategoryInput | ServiceCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutSubCategoriesInput = {
    update: XOR<CategoryUpdateWithoutSubCategoriesInput, CategoryUncheckedUpdateWithoutSubCategoriesInput>
    create: XOR<CategoryCreateWithoutSubCategoriesInput, CategoryUncheckedCreateWithoutSubCategoriesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutSubCategoriesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutSubCategoriesInput, CategoryUncheckedUpdateWithoutSubCategoriesInput>
  }

  export type CategoryUpdateWithoutSubCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategory?: CategoryUpdateOneWithoutSubCategoriesNestedInput
    userInterests?: UserInterestUpdateManyWithoutCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutSubCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    userInterests?: UserInterestUncheckedUpdateManyWithoutCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutParentCategoryInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutParentCategoryInput, CategoryUncheckedUpdateWithoutParentCategoryInput>
    create: XOR<CategoryCreateWithoutParentCategoryInput, CategoryUncheckedCreateWithoutParentCategoryInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutParentCategoryInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutParentCategoryInput, CategoryUncheckedUpdateWithoutParentCategoryInput>
  }

  export type CategoryUpdateManyWithWhereWithoutParentCategoryInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutParentCategoryInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    imageUrl?: StringNullableFilter<"Category"> | string | null
    isActive?: BoolFilter<"Category"> | boolean
    featured?: BoolFilter<"Category"> | boolean
    parentCategoryId?: StringNullableFilter<"Category"> | string | null
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

  export type ServiceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
  }

  export type ServiceUpdateManyWithWhereWithoutCategoryInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutInterestsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    services?: ServiceCreateNestedManyWithoutProviderInput
  }

  export type UserUncheckedCreateWithoutInterestsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    services?: ServiceUncheckedCreateNestedManyWithoutProviderInput
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
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategory?: CategoryCreateNestedOneWithoutSubCategoriesInput
    subCategories?: CategoryCreateNestedManyWithoutParentCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutUserInterestsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: string | null
    subCategories?: CategoryUncheckedCreateNestedManyWithoutParentCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
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
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    services?: ServiceUpdateManyWithoutProviderNestedInput
  }

  export type UserUncheckedUpdateWithoutInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    services?: ServiceUncheckedUpdateManyWithoutProviderNestedInput
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
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategory?: CategoryUpdateOneWithoutSubCategoriesNestedInput
    subCategories?: CategoryUpdateManyWithoutParentCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutUserInterestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    subCategories?: CategoryUncheckedUpdateManyWithoutParentCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type UserCreateWithoutVerificationDocumentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    services?: ServiceCreateNestedManyWithoutProviderInput
  }

  export type UserUncheckedCreateWithoutVerificationDocumentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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
    services?: ServiceUncheckedCreateNestedManyWithoutProviderInput
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
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    services?: ServiceUpdateManyWithoutProviderNestedInput
  }

  export type UserUncheckedUpdateWithoutVerificationDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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
    services?: ServiceUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type UserCreateWithoutServicesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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

  export type UserUncheckedCreateWithoutServicesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    emailVerified?: boolean
    emailVerificationOtp?: string | null
    emailVerificationExpires?: Date | string | null
    emailVerificationAttempts?: number
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

  export type UserCreateOrConnectWithoutServicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
  }

  export type CategoryCreateWithoutServicesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategory?: CategoryCreateNestedOneWithoutSubCategoriesInput
    subCategories?: CategoryCreateNestedManyWithoutParentCategoryInput
    userInterests?: UserInterestCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutServicesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
    parentCategoryId?: string | null
    subCategories?: CategoryUncheckedCreateNestedManyWithoutParentCategoryInput
    userInterests?: UserInterestUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutServicesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
  }

  export type ServicePlanCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    price: Decimal | DecimalJsLike | number | string
    inclusions: string
    isPopular?: boolean
    sortOrder?: number
  }

  export type ServicePlanUncheckedCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    price: Decimal | DecimalJsLike | number | string
    inclusions: string
    isPopular?: boolean
    sortOrder?: number
  }

  export type ServicePlanCreateOrConnectWithoutServiceInput = {
    where: ServicePlanWhereUniqueInput
    create: XOR<ServicePlanCreateWithoutServiceInput, ServicePlanUncheckedCreateWithoutServiceInput>
  }

  export type ServicePlanCreateManyServiceInputEnvelope = {
    data: ServicePlanCreateManyServiceInput | ServicePlanCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ServiceAddonCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
  }

  export type ServiceAddonUncheckedCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
  }

  export type ServiceAddonCreateOrConnectWithoutServiceInput = {
    where: ServiceAddonWhereUniqueInput
    create: XOR<ServiceAddonCreateWithoutServiceInput, ServiceAddonUncheckedCreateWithoutServiceInput>
  }

  export type ServiceAddonCreateManyServiceInputEnvelope = {
    data: ServiceAddonCreateManyServiceInput | ServiceAddonCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ServiceImageCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    url: string
    fileName: string
    sortOrder?: number
  }

  export type ServiceImageUncheckedCreateWithoutServiceInput = {
    id?: string
    createdAt?: Date | string
    url: string
    fileName: string
    sortOrder?: number
  }

  export type ServiceImageCreateOrConnectWithoutServiceInput = {
    where: ServiceImageWhereUniqueInput
    create: XOR<ServiceImageCreateWithoutServiceInput, ServiceImageUncheckedCreateWithoutServiceInput>
  }

  export type ServiceImageCreateManyServiceInputEnvelope = {
    data: ServiceImageCreateManyServiceInput | ServiceImageCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutServicesInput = {
    update: XOR<UserUpdateWithoutServicesInput, UserUncheckedUpdateWithoutServicesInput>
    create: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServicesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServicesInput, UserUncheckedUpdateWithoutServicesInput>
  }

  export type UserUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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

  export type UserUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationOtp?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerificationExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emailVerificationAttempts?: IntFieldUpdateOperationsInput | number
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

  export type CategoryUpsertWithoutServicesInput = {
    update: XOR<CategoryUpdateWithoutServicesInput, CategoryUncheckedUpdateWithoutServicesInput>
    create: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutServicesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutServicesInput, CategoryUncheckedUpdateWithoutServicesInput>
  }

  export type CategoryUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategory?: CategoryUpdateOneWithoutSubCategoriesNestedInput
    subCategories?: CategoryUpdateManyWithoutParentCategoryNestedInput
    userInterests?: UserInterestUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    subCategories?: CategoryUncheckedUpdateManyWithoutParentCategoryNestedInput
    userInterests?: UserInterestUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ServicePlanUpsertWithWhereUniqueWithoutServiceInput = {
    where: ServicePlanWhereUniqueInput
    update: XOR<ServicePlanUpdateWithoutServiceInput, ServicePlanUncheckedUpdateWithoutServiceInput>
    create: XOR<ServicePlanCreateWithoutServiceInput, ServicePlanUncheckedCreateWithoutServiceInput>
  }

  export type ServicePlanUpdateWithWhereUniqueWithoutServiceInput = {
    where: ServicePlanWhereUniqueInput
    data: XOR<ServicePlanUpdateWithoutServiceInput, ServicePlanUncheckedUpdateWithoutServiceInput>
  }

  export type ServicePlanUpdateManyWithWhereWithoutServiceInput = {
    where: ServicePlanScalarWhereInput
    data: XOR<ServicePlanUpdateManyMutationInput, ServicePlanUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServicePlanScalarWhereInput = {
    AND?: ServicePlanScalarWhereInput | ServicePlanScalarWhereInput[]
    OR?: ServicePlanScalarWhereInput[]
    NOT?: ServicePlanScalarWhereInput | ServicePlanScalarWhereInput[]
    id?: StringFilter<"ServicePlan"> | string
    createdAt?: DateTimeFilter<"ServicePlan"> | Date | string
    updatedAt?: DateTimeFilter<"ServicePlan"> | Date | string
    title?: StringFilter<"ServicePlan"> | string
    price?: DecimalFilter<"ServicePlan"> | Decimal | DecimalJsLike | number | string
    inclusions?: StringFilter<"ServicePlan"> | string
    isPopular?: BoolFilter<"ServicePlan"> | boolean
    sortOrder?: IntFilter<"ServicePlan"> | number
    serviceId?: StringFilter<"ServicePlan"> | string
  }

  export type ServiceAddonUpsertWithWhereUniqueWithoutServiceInput = {
    where: ServiceAddonWhereUniqueInput
    update: XOR<ServiceAddonUpdateWithoutServiceInput, ServiceAddonUncheckedUpdateWithoutServiceInput>
    create: XOR<ServiceAddonCreateWithoutServiceInput, ServiceAddonUncheckedCreateWithoutServiceInput>
  }

  export type ServiceAddonUpdateWithWhereUniqueWithoutServiceInput = {
    where: ServiceAddonWhereUniqueInput
    data: XOR<ServiceAddonUpdateWithoutServiceInput, ServiceAddonUncheckedUpdateWithoutServiceInput>
  }

  export type ServiceAddonUpdateManyWithWhereWithoutServiceInput = {
    where: ServiceAddonScalarWhereInput
    data: XOR<ServiceAddonUpdateManyMutationInput, ServiceAddonUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServiceAddonScalarWhereInput = {
    AND?: ServiceAddonScalarWhereInput | ServiceAddonScalarWhereInput[]
    OR?: ServiceAddonScalarWhereInput[]
    NOT?: ServiceAddonScalarWhereInput | ServiceAddonScalarWhereInput[]
    id?: StringFilter<"ServiceAddon"> | string
    createdAt?: DateTimeFilter<"ServiceAddon"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceAddon"> | Date | string
    title?: StringFilter<"ServiceAddon"> | string
    description?: StringNullableFilter<"ServiceAddon"> | string | null
    price?: DecimalFilter<"ServiceAddon"> | Decimal | DecimalJsLike | number | string
    serviceId?: StringFilter<"ServiceAddon"> | string
  }

  export type ServiceImageUpsertWithWhereUniqueWithoutServiceInput = {
    where: ServiceImageWhereUniqueInput
    update: XOR<ServiceImageUpdateWithoutServiceInput, ServiceImageUncheckedUpdateWithoutServiceInput>
    create: XOR<ServiceImageCreateWithoutServiceInput, ServiceImageUncheckedCreateWithoutServiceInput>
  }

  export type ServiceImageUpdateWithWhereUniqueWithoutServiceInput = {
    where: ServiceImageWhereUniqueInput
    data: XOR<ServiceImageUpdateWithoutServiceInput, ServiceImageUncheckedUpdateWithoutServiceInput>
  }

  export type ServiceImageUpdateManyWithWhereWithoutServiceInput = {
    where: ServiceImageScalarWhereInput
    data: XOR<ServiceImageUpdateManyMutationInput, ServiceImageUncheckedUpdateManyWithoutServiceInput>
  }

  export type ServiceImageScalarWhereInput = {
    AND?: ServiceImageScalarWhereInput | ServiceImageScalarWhereInput[]
    OR?: ServiceImageScalarWhereInput[]
    NOT?: ServiceImageScalarWhereInput | ServiceImageScalarWhereInput[]
    id?: StringFilter<"ServiceImage"> | string
    createdAt?: DateTimeFilter<"ServiceImage"> | Date | string
    url?: StringFilter<"ServiceImage"> | string
    fileName?: StringFilter<"ServiceImage"> | string
    sortOrder?: IntFilter<"ServiceImage"> | number
    serviceId?: StringFilter<"ServiceImage"> | string
  }

  export type ServiceCreateWithoutPlansInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    provider: UserCreateNestedOneWithoutServicesInput
    category: CategoryCreateNestedOneWithoutServicesInput
    addons?: ServiceAddonCreateNestedManyWithoutServiceInput
    images?: ServiceImageCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutPlansInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    providerId: string
    categoryId: string
    addons?: ServiceAddonUncheckedCreateNestedManyWithoutServiceInput
    images?: ServiceImageUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutPlansInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutPlansInput, ServiceUncheckedCreateWithoutPlansInput>
  }

  export type ServiceUpsertWithoutPlansInput = {
    update: XOR<ServiceUpdateWithoutPlansInput, ServiceUncheckedUpdateWithoutPlansInput>
    create: XOR<ServiceCreateWithoutPlansInput, ServiceUncheckedCreateWithoutPlansInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutPlansInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutPlansInput, ServiceUncheckedUpdateWithoutPlansInput>
  }

  export type ServiceUpdateWithoutPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    provider?: UserUpdateOneRequiredWithoutServicesNestedInput
    category?: CategoryUpdateOneRequiredWithoutServicesNestedInput
    addons?: ServiceAddonUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    providerId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    addons?: ServiceAddonUncheckedUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateWithoutAddonsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    provider: UserCreateNestedOneWithoutServicesInput
    category: CategoryCreateNestedOneWithoutServicesInput
    plans?: ServicePlanCreateNestedManyWithoutServiceInput
    images?: ServiceImageCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutAddonsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    providerId: string
    categoryId: string
    plans?: ServicePlanUncheckedCreateNestedManyWithoutServiceInput
    images?: ServiceImageUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutAddonsInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutAddonsInput, ServiceUncheckedCreateWithoutAddonsInput>
  }

  export type ServiceUpsertWithoutAddonsInput = {
    update: XOR<ServiceUpdateWithoutAddonsInput, ServiceUncheckedUpdateWithoutAddonsInput>
    create: XOR<ServiceCreateWithoutAddonsInput, ServiceUncheckedCreateWithoutAddonsInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutAddonsInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutAddonsInput, ServiceUncheckedUpdateWithoutAddonsInput>
  }

  export type ServiceUpdateWithoutAddonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    provider?: UserUpdateOneRequiredWithoutServicesNestedInput
    category?: CategoryUpdateOneRequiredWithoutServicesNestedInput
    plans?: ServicePlanUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutAddonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    providerId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    plans?: ServicePlanUncheckedUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateWithoutImagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    provider: UserCreateNestedOneWithoutServicesInput
    category: CategoryCreateNestedOneWithoutServicesInput
    plans?: ServicePlanCreateNestedManyWithoutServiceInput
    addons?: ServiceAddonCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutImagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    providerId: string
    categoryId: string
    plans?: ServicePlanUncheckedCreateNestedManyWithoutServiceInput
    addons?: ServiceAddonUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutImagesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutImagesInput, ServiceUncheckedCreateWithoutImagesInput>
  }

  export type ServiceUpsertWithoutImagesInput = {
    update: XOR<ServiceUpdateWithoutImagesInput, ServiceUncheckedUpdateWithoutImagesInput>
    create: XOR<ServiceCreateWithoutImagesInput, ServiceUncheckedCreateWithoutImagesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutImagesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutImagesInput, ServiceUncheckedUpdateWithoutImagesInput>
  }

  export type ServiceUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    provider?: UserUpdateOneRequiredWithoutServicesNestedInput
    category?: CategoryUpdateOneRequiredWithoutServicesNestedInput
    plans?: ServicePlanUpdateManyWithoutServiceNestedInput
    addons?: ServiceAddonUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    providerId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    plans?: ServicePlanUncheckedUpdateManyWithoutServiceNestedInput
    addons?: ServiceAddonUncheckedUpdateManyWithoutServiceNestedInput
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

  export type ServiceCreateManyProviderInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    categoryId: string
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

  export type ServiceUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    category?: CategoryUpdateOneRequiredWithoutServicesNestedInput
    plans?: ServicePlanUpdateManyWithoutServiceNestedInput
    addons?: ServiceAddonUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    categoryId?: StringFieldUpdateOperationsInput | string
    plans?: ServicePlanUncheckedUpdateManyWithoutServiceNestedInput
    addons?: ServiceAddonUncheckedUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateManyParentCategoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    imageUrl?: string | null
    isActive?: boolean
    featured?: boolean
  }

  export type UserInterestCreateManyCategoryInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    type: $Enums.UserInterestType
  }

  export type ServiceCreateManyCategoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    overview: string
    coverImage?: string | null
    tags?: ServiceCreatetagsInput | string[]
    status?: $Enums.ServiceStatus
    providerId: string
  }

  export type CategoryUpdateWithoutParentCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    subCategories?: CategoryUpdateManyWithoutParentCategoryNestedInput
    userInterests?: UserInterestUpdateManyWithoutCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutParentCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    subCategories?: CategoryUncheckedUpdateManyWithoutParentCategoryNestedInput
    userInterests?: UserInterestUncheckedUpdateManyWithoutCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutParentCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
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

  export type ServiceUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    provider?: UserUpdateOneRequiredWithoutServicesNestedInput
    plans?: ServicePlanUpdateManyWithoutServiceNestedInput
    addons?: ServiceAddonUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    providerId?: StringFieldUpdateOperationsInput | string
    plans?: ServicePlanUncheckedUpdateManyWithoutServiceNestedInput
    addons?: ServiceAddonUncheckedUpdateManyWithoutServiceNestedInput
    images?: ServiceImageUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    overview?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ServiceUpdatetagsInput | string[]
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    providerId?: StringFieldUpdateOperationsInput | string
  }

  export type ServicePlanCreateManyServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    price: Decimal | DecimalJsLike | number | string
    inclusions: string
    isPopular?: boolean
    sortOrder?: number
  }

  export type ServiceAddonCreateManyServiceInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
  }

  export type ServiceImageCreateManyServiceInput = {
    id?: string
    createdAt?: Date | string
    url: string
    fileName: string
    sortOrder?: number
  }

  export type ServicePlanUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    inclusions?: StringFieldUpdateOperationsInput | string
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ServicePlanUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    inclusions?: StringFieldUpdateOperationsInput | string
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ServicePlanUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    inclusions?: StringFieldUpdateOperationsInput | string
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceAddonUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ServiceAddonUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ServiceAddonUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type ServiceImageUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceImageUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceImageUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    sortOrder?: IntFieldUpdateOperationsInput | number
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