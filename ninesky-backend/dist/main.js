/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./libs/decorators/getUser.ts":
/*!************************************!*\
  !*** ./libs/decorators/getUser.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),

/***/ "./libs/dtos/UserDto.ts/create-user.dto.ts":
/*!*************************************************!*\
  !*** ./libs/dtos/UserDto.ts/create-user.dto.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const accese_levels_enum_1 = __webpack_require__(/*! libs/enums/accese.levels.enum */ "./libs/enums/accese.levels.enum.ts");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 50),
    __metadata("design:type", String)
], CreateUserDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]{11}$/, { message: 'Personal number must be exactly 11 digits' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "personal_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "office", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(accese_levels_enum_1.AccessLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof accese_levels_enum_1.AccessLevel !== "undefined" && accese_levels_enum_1.AccessLevel) === "function" ? _a : Object)
], CreateUserDto.prototype, "accessLevel", void 0);


/***/ }),

/***/ "./libs/dtos/UserDto.ts/update-user.dto.ts":
/*!*************************************************!*\
  !*** ./libs/dtos/UserDto.ts/update-user.dto.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_user_dto_1 = __webpack_require__(/*! ./create-user.dto */ "./libs/dtos/UserDto.ts/create-user.dto.ts");
class UpdateUserDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./libs/dtos/declarationDtos.ts/createDeclarationDto.ts":
/*!**************************************************************!*\
  !*** ./libs/dtos/declarationDtos.ts/createDeclarationDto.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateDeclarationDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateDeclarationDto {
}
exports.CreateDeclarationDto = CreateDeclarationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeclarationDto.prototype, "tracking_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeclarationDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDeclarationDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDeclarationDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDeclarationDto.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Buffer !== "undefined" && Buffer) === "function" ? _a : Object)
], CreateDeclarationDto.prototype, "invoice_Pdf", void 0);


/***/ }),

/***/ "./libs/dtos/flightDtos/createFlightDto.ts":
/*!*************************************************!*\
  !*** ./libs/dtos/flightDtos/createFlightDto.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateFlightDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const flightsFrom_enum_1 = __webpack_require__(/*! libs/enums/flightsFrom.enum */ "./libs/enums/flightsFrom.enum.ts");
class CreateFlightDto {
}
exports.CreateFlightDto = CreateFlightDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "flight_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(flightsFrom_enum_1.FlightFrom),
    __metadata("design:type", typeof (_a = typeof flightsFrom_enum_1.FlightFrom !== "undefined" && flightsFrom_enum_1.FlightFrom) === "function" ? _a : Object)
], CreateFlightDto.prototype, "flight_from", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFlightDto.prototype, "arrived_at", void 0);


/***/ }),

/***/ "./libs/dtos/parcelDtos.ts/UploadParcelsDto.ts":
/*!*****************************************************!*\
  !*** ./libs/dtos/parcelDtos.ts/UploadParcelsDto.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadParcelsDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const create_parcel_dto_1 = __webpack_require__(/*! ./create-parcel.dto */ "./libs/dtos/parcelDtos.ts/create-parcel.dto.ts");
const createFlightDto_1 = __webpack_require__(/*! ../flightDtos/createFlightDto */ "./libs/dtos/flightDtos/createFlightDto.ts");
class UploadParcelsDto {
}
exports.UploadParcelsDto = UploadParcelsDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => createFlightDto_1.CreateFlightDto),
    __metadata("design:type", typeof (_a = typeof createFlightDto_1.CreateFlightDto !== "undefined" && createFlightDto_1.CreateFlightDto) === "function" ? _a : Object)
], UploadParcelsDto.prototype, "flight_info", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_parcel_dto_1.CreateParcelDto),
    __metadata("design:type", Array)
], UploadParcelsDto.prototype, "parcels", void 0);


/***/ }),

/***/ "./libs/dtos/parcelDtos.ts/create-parcel.dto.ts":
/*!******************************************************!*\
  !*** ./libs/dtos/parcelDtos.ts/create-parcel.dto.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateParcelDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const shipping_status_enum_1 = __webpack_require__(/*! libs/enums/shipping.status.enum */ "./libs/enums/shipping.status.enum.ts");
class CreateParcelDto {
}
exports.CreateParcelDto = CreateParcelDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParcelDto.prototype, "tracking_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateParcelDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(shipping_status_enum_1.ShippingStatus),
    __metadata("design:type", typeof (_a = typeof shipping_status_enum_1.ShippingStatus !== "undefined" && shipping_status_enum_1.ShippingStatus) === "function" ? _a : Object)
], CreateParcelDto.prototype, "shipping_status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateParcelDto.prototype, "ownerId", void 0);


/***/ }),

/***/ "./libs/dtos/parcelDtos.ts/update-parcel.dto.ts":
/*!******************************************************!*\
  !*** ./libs/dtos/parcelDtos.ts/update-parcel.dto.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateParcelDto = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_parcel_dto_1 = __webpack_require__(/*! ./create-parcel.dto */ "./libs/dtos/parcelDtos.ts/create-parcel.dto.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const payment_status_enum_1 = __webpack_require__(/*! libs/enums/payment.status.enum */ "./libs/enums/payment.status.enum.ts");
class UpdateParcelDto extends (0, mapped_types_1.PartialType)(create_parcel_dto_1.CreateParcelDto) {
}
exports.UpdateParcelDto = UpdateParcelDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(payment_status_enum_1.PaymentType),
    __metadata("design:type", typeof (_a = typeof payment_status_enum_1.PaymentType !== "undefined" && payment_status_enum_1.PaymentType) === "function" ? _a : Object)
], UpdateParcelDto.prototype, "payment_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateParcelDto.prototype, "price", void 0);


/***/ }),

/***/ "./libs/entities/address.entety.ts":
/*!*****************************************!*\
  !*** ./libs/entities/address.entety.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Address = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Address = class Address {
};
exports.Address = Address;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Address.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "Province", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "Country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "District", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "Street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "Address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "TEL", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Address.prototype, "ZIP", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)()
], Address);


/***/ }),

/***/ "./libs/entities/declaration.entity.ts":
/*!*********************************************!*\
  !*** ./libs/entities/declaration.entity.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Declaration = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const parcel_entity_1 = __webpack_require__(/*! ./parcel.entity */ "./libs/entities/parcel.entity.ts");
let Declaration = class Declaration {
};
exports.Declaration = Declaration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Declaration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => parcel_entity_1.Parcel, (user) => user.declaration),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_a = typeof parcel_entity_1.Parcel !== "undefined" && parcel_entity_1.Parcel) === "function" ? _a : Object)
], Declaration.prototype, "parcel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Declaration.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Declaration.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Declaration.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Declaration.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'longblob',
        nullable: true,
    }),
    __metadata("design:type", typeof (_b = typeof Buffer !== "undefined" && Buffer) === "function" ? _b : Object)
], Declaration.prototype, "invoice_Pdf", void 0);
exports.Declaration = Declaration = __decorate([
    (0, typeorm_1.Entity)()
], Declaration);


/***/ }),

/***/ "./libs/entities/flight.entity.ts":
/*!****************************************!*\
  !*** ./libs/entities/flight.entity.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Flight = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const parcel_entity_1 = __webpack_require__(/*! ./parcel.entity */ "./libs/entities/parcel.entity.ts");
const flightsFrom_enum_1 = __webpack_require__(/*! libs/enums/flightsFrom.enum */ "./libs/enums/flightsFrom.enum.ts");
let Flight = class Flight {
};
exports.Flight = Flight;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Flight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Flight.prototype, "flight_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parcel_entity_1.Parcel, (parcel) => parcel.flight),
    __metadata("design:type", Array)
], Flight.prototype, "parcels", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: flightsFrom_enum_1.FlightFrom,
    }),
    __metadata("design:type", typeof (_a = typeof flightsFrom_enum_1.FlightFrom !== "undefined" && flightsFrom_enum_1.FlightFrom) === "function" ? _a : Object)
], Flight.prototype, "flight_from", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Flight.prototype, "created_at", void 0);
exports.Flight = Flight = __decorate([
    (0, typeorm_1.Entity)()
], Flight);


/***/ }),

/***/ "./libs/entities/parcel.entity.ts":
/*!****************************************!*\
  !*** ./libs/entities/parcel.entity.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Parcel = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/entities/user.entity.ts");
const shipping_status_enum_1 = __webpack_require__(/*! libs/enums/shipping.status.enum */ "./libs/enums/shipping.status.enum.ts");
const declaration_entity_1 = __webpack_require__(/*! ./declaration.entity */ "./libs/entities/declaration.entity.ts");
const payment_status_enum_1 = __webpack_require__(/*! libs/enums/payment.status.enum */ "./libs/enums/payment.status.enum.ts");
const flight_entity_1 = __webpack_require__(/*! ./flight.entity */ "./libs/entities/flight.entity.ts");
let Parcel = class Parcel {
};
exports.Parcel = Parcel;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Parcel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Parcel.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Parcel.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: shipping_status_enum_1.ShippingStatus,
        default: shipping_status_enum_1.ShippingStatus.BROUGHT,
    }),
    __metadata("design:type", typeof (_a = typeof shipping_status_enum_1.ShippingStatus !== "undefined" && shipping_status_enum_1.ShippingStatus) === "function" ? _a : Object)
], Parcel.prototype, "shipping_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: payment_status_enum_1.PaymentType,
        default: payment_status_enum_1.PaymentType.UNPAID,
    }),
    __metadata("design:type", String)
], Parcel.prototype, "payment_status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => declaration_entity_1.Declaration, (declaration) => declaration.parcel, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_b = typeof declaration_entity_1.Declaration !== "undefined" && declaration_entity_1.Declaration) === "function" ? _b : Object)
], Parcel.prototype, "declaration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.parcels),
    __metadata("design:type", typeof (_c = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _c : Object)
], Parcel.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => flight_entity_1.Flight, (flight) => flight.parcels),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_d = typeof flight_entity_1.Flight !== "undefined" && flight_entity_1.Flight) === "function" ? _d : Object)
], Parcel.prototype, "flight", void 0);
exports.Parcel = Parcel = __decorate([
    (0, typeorm_1.Entity)()
], Parcel);


/***/ }),

/***/ "./libs/entities/payment.entity.ts":
/*!*****************************************!*\
  !*** ./libs/entities/payment.entity.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentHistory = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/entities/user.entity.ts");
let PaymentHistory = class PaymentHistory {
};
exports.PaymentHistory = PaymentHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PaymentHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PaymentHistory.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentHistory.prototype, "payment_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentHistory.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentHistory.prototype, "masked_card", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], PaymentHistory.prototype, "maskresponse_signature_stringed_card", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentHistory.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.transactions, { eager: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], PaymentHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PaymentHistory.prototype, "date", void 0);
exports.PaymentHistory = PaymentHistory = __decorate([
    (0, typeorm_1.Entity)()
], PaymentHistory);


/***/ }),

/***/ "./libs/entities/prices.entity.ts":
/*!****************************************!*\
  !*** ./libs/entities/prices.entity.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Price = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Price = class Price {
};
exports.Price = Price;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Price.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Price.prototype, "Turkey", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Price.prototype, "China", void 0);
exports.Price = Price = __decorate([
    (0, typeorm_1.Entity)()
], Price);


/***/ }),

/***/ "./libs/entities/transactions.entity.ts":
/*!**********************************************!*\
  !*** ./libs/entities/transactions.entity.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transaction = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/entities/user.entity.ts");
const transactions_enum_1 = __webpack_require__(/*! libs/enums/transactions.enum */ "./libs/enums/transactions.enum.ts");
let Transaction = class Transaction {
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: transactions_enum_1.TransactionType,
    }),
    __metadata("design:type", typeof (_a = typeof transactions_enum_1.TransactionType !== "undefined" && transactions_enum_1.TransactionType) === "function" ? _a : Object)
], Transaction.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.transactions, { eager: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_b = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _b : Object)
], Transaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Transaction.prototype, "date", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)()
], Transaction);


/***/ }),

/***/ "./libs/entities/user.entity.ts":
/*!**************************************!*\
  !*** ./libs/entities/user.entity.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const parcel_entity_1 = __webpack_require__(/*! ./parcel.entity */ "./libs/entities/parcel.entity.ts");
const accese_levels_enum_1 = __webpack_require__(/*! libs/enums/accese.levels.enum */ "./libs/enums/accese.levels.enum.ts");
const transactions_entity_1 = __webpack_require__(/*! ./transactions.entity */ "./libs/entities/transactions.entity.ts");
const userDetails_entity_1 = __webpack_require__(/*! ./userDetails.entity */ "./libs/entities/userDetails.entity.ts");
const payment_entity_1 = __webpack_require__(/*! ./payment.entity */ "./libs/entities/payment.entity.ts");
let User = class User {
    generateId() {
        const randomNumber = Math.floor(Math.random() * 1000000);
        this.id = `SKY-${randomNumber.toString().padStart(6, '0')}`;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "personal_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: accese_levels_enum_1.AccessLevel,
        default: accese_levels_enum_1.AccessLevel.USER,
    }),
    __metadata("design:type", typeof (_a = typeof accese_levels_enum_1.AccessLevel !== "undefined" && accese_levels_enum_1.AccessLevel) === "function" ? _a : Object)
], User.prototype, "accessLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => userDetails_entity_1.UserDetails, (userDetails) => userDetails.user, {
        cascade: true,
        nullable: true,
    }),
    __metadata("design:type", typeof (_b = typeof userDetails_entity_1.UserDetails !== "undefined" && userDetails_entity_1.UserDetails) === "function" ? _b : Object)
], User.prototype, "userDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => parcel_entity_1.Parcel, (parcel) => parcel.owner),
    __metadata("design:type", Array)
], User.prototype, "parcels", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transactions_entity_1.Transaction, (transaction) => transaction.user),
    __metadata("design:type", Array)
], User.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.PaymentHistory, (paymentHistory) => paymentHistory.user),
    __metadata("design:type", Array)
], User.prototype, "payment_history", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "generateId", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);


/***/ }),

/***/ "./libs/entities/userDetails.entity.ts":
/*!*********************************************!*\
  !*** ./libs/entities/userDetails.entity.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDetails = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ./user.entity */ "./libs/entities/user.entity.ts");
let UserDetails = class UserDetails {
};
exports.UserDetails = UserDetails;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], UserDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.userDetails),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], UserDetails.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserDetails.prototype, "personal_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "office", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserDetails.prototype, "address", void 0);
exports.UserDetails = UserDetails = __decorate([
    (0, typeorm_1.Entity)()
], UserDetails);


/***/ }),

/***/ "./libs/enums/accese.levels.enum.ts":
/*!******************************************!*\
  !*** ./libs/enums/accese.levels.enum.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessLevel = void 0;
var AccessLevel;
(function (AccessLevel) {
    AccessLevel[AccessLevel["USER"] = 0] = "USER";
    AccessLevel[AccessLevel["MODERATOR"] = 1] = "MODERATOR";
    AccessLevel[AccessLevel["ADMIN"] = 2] = "ADMIN";
    AccessLevel[AccessLevel["SUPER_ADMIN"] = 3] = "SUPER_ADMIN";
})(AccessLevel || (exports.AccessLevel = AccessLevel = {}));


/***/ }),

/***/ "./libs/enums/flightsFrom.enum.ts":
/*!****************************************!*\
  !*** ./libs/enums/flightsFrom.enum.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlightFrom = void 0;
var FlightFrom;
(function (FlightFrom) {
    FlightFrom["CHINA"] = "China";
    FlightFrom["TURKEY"] = "Turkey";
})(FlightFrom || (exports.FlightFrom = FlightFrom = {}));


/***/ }),

/***/ "./libs/enums/payment.status.enum.ts":
/*!*******************************************!*\
  !*** ./libs/enums/payment.status.enum.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentType = void 0;
var PaymentType;
(function (PaymentType) {
    PaymentType["PAID"] = "Paid";
    PaymentType["UNPAID"] = "Unpaid";
})(PaymentType || (exports.PaymentType = PaymentType = {}));


/***/ }),

/***/ "./libs/enums/shipping.status.enum.ts":
/*!********************************************!*\
  !*** ./libs/enums/shipping.status.enum.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShippingStatus = void 0;
var ShippingStatus;
(function (ShippingStatus) {
    ShippingStatus["BROUGHT"] = "Brought";
    ShippingStatus["SHIPPED"] = "Shipped";
    ShippingStatus["ARRIVED"] = "Arrived";
    ShippingStatus["TAKEN"] = "Taken";
})(ShippingStatus || (exports.ShippingStatus = ShippingStatus = {}));


/***/ }),

/***/ "./libs/enums/transactions.enum.ts":
/*!*****************************************!*\
  !*** ./libs/enums/transactions.enum.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "Deposit";
    TransactionType["PAYMENT"] = "Payment";
})(TransactionType || (exports.TransactionType = TransactionType = {}));


/***/ }),

/***/ "./libs/guards/Jwt.Auth.Guard.ts":
/*!***************************************!*\
  !*** ./libs/guards/Jwt.Auth.Guard.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const canActivate = await super.canActivate(context);
        const user = request.user;
        if (!canActivate || !user) {
            throw new common_1.UnauthorizedException('User not authorized or token is invalid');
        }
        return true;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),

/***/ "./libs/guards/jwt.Admin.Guard.ts":
/*!****************************************!*\
  !*** ./libs/guards/jwt.Admin.Guard.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAdminGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAdminGuard = class JwtAdminGuard extends (0, passport_1.AuthGuard)('jwt') {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const canActivate = await super.canActivate(context);
        const user = request.user;
        if (!canActivate || !user) {
            throw new common_1.UnauthorizedException('User not authorized or token is invalid');
        }
        if (user.accessLevel >= 3) {
            return true;
        }
        throw new common_1.UnauthorizedException('User is not an admin');
    }
};
exports.JwtAdminGuard = JwtAdminGuard;
exports.JwtAdminGuard = JwtAdminGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAdminGuard);


/***/ }),

/***/ "./libs/jwt/jwt.strategy.ts":
/*!**********************************!*\
  !*** ./libs/jwt/jwt.strategy.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }
    async validate(payload) {
        const { iat, exp, ...filteredPayload } = payload;
        if (!filteredPayload) {
            throw new common_1.UnauthorizedException("Invalid token payload.");
        }
        return filteredPayload;
    }
}
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/admin/admin.controller.ts":
/*!***************************************!*\
  !*** ./src/admin/admin.controller.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const admin_service_1 = __webpack_require__(/*! ./admin.service */ "./src/admin/admin.service.ts");
const update_user_dto_1 = __webpack_require__(/*! libs/dtos/UserDto.ts/update-user.dto */ "./libs/dtos/UserDto.ts/update-user.dto.ts");
const UploadParcelsDto_1 = __webpack_require__(/*! libs/dtos/parcelDtos.ts/UploadParcelsDto */ "./libs/dtos/parcelDtos.ts/UploadParcelsDto.ts");
const update_parcel_dto_1 = __webpack_require__(/*! libs/dtos/parcelDtos.ts/update-parcel.dto */ "./libs/dtos/parcelDtos.ts/update-parcel.dto.ts");
const jwt_Admin_Guard_1 = __webpack_require__(/*! libs/guards/jwt.Admin.Guard */ "./libs/guards/jwt.Admin.Guard.ts");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    uploadParcels(body) {
        return this.adminService.uploadParcels(body);
    }
    getParcels(data) {
        return this.adminService.getAllParcel(data);
    }
    updateParcel(id, updateParcelDto) {
        return this.adminService.updateParcel(id, updateParcelDto);
    }
    deleteParcel(id) {
        return this.adminService.deleteParcel(id);
    }
    getUsers(data) {
        return this.adminService.getUsers(data);
    }
    updateUser(data, id) {
        return this.adminService.updateUser(id, data);
    }
    deleteUser(id) {
        return this.adminService.deleteUser(id);
    }
    updatePrice(data) {
        return this.adminService.updatePrice(data);
    }
    async paymentHistory(page = 1, limit = 10, userId, sort = 'DESC') {
        return this.adminService.getPaymentHistory(page, limit, userId, sort);
    }
    async transactionHistory(page = 1, limit = 10, userId, sort = 'DESC') {
        return this.adminService.transactionHistory(page, limit, userId, sort);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('/create-parcels'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof UploadParcelsDto_1.UploadParcelsDto !== "undefined" && UploadParcelsDto_1.UploadParcelsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "uploadParcels", null);
__decorate([
    (0, common_1.Get)('/get-parcels'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof getParcelDto !== "undefined" && getParcelDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getParcels", null);
__decorate([
    (0, common_1.Put)('/update-parcel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_parcel_dto_1.UpdateParcelDto !== "undefined" && update_parcel_dto_1.UpdateParcelDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateParcel", null);
__decorate([
    (0, common_1.Delete)('/delete-parcel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteParcel", null);
__decorate([
    (0, common_1.Get)('/get-users'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof getUserDto !== "undefined" && getUserDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Put)('/update-user/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _f : Object, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/delete-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('update-price'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updatePrice", null);
__decorate([
    (0, common_1.Get)('/payment-history'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('userId')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "paymentHistory", null);
__decorate([
    (0, common_1.Get)('/transaction-history'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('userId')),
    __param(3, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "transactionHistory", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.UseGuards)(jwt_Admin_Guard_1.JwtAdminGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AdminController);


/***/ }),

/***/ "./src/admin/admin.module.ts":
/*!***********************************!*\
  !*** ./src/admin/admin.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const admin_service_1 = __webpack_require__(/*! ./admin.service */ "./src/admin/admin.service.ts");
const admin_controller_1 = __webpack_require__(/*! ./admin.controller */ "./src/admin/admin.controller.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const parcel_entity_1 = __webpack_require__(/*! libs/entities/parcel.entity */ "./libs/entities/parcel.entity.ts");
const user_entity_1 = __webpack_require__(/*! libs/entities/user.entity */ "./libs/entities/user.entity.ts");
const flight_entity_1 = __webpack_require__(/*! libs/entities/flight.entity */ "./libs/entities/flight.entity.ts");
const prices_entity_1 = __webpack_require__(/*! libs/entities/prices.entity */ "./libs/entities/prices.entity.ts");
const payment_entity_1 = __webpack_require__(/*! libs/entities/payment.entity */ "./libs/entities/payment.entity.ts");
const transactions_entity_1 = __webpack_require__(/*! libs/entities/transactions.entity */ "./libs/entities/transactions.entity.ts");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([parcel_entity_1.Parcel, user_entity_1.User, flight_entity_1.Flight, prices_entity_1.Price, payment_entity_1.PaymentHistory, transactions_entity_1.Transaction])],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
    })
], AdminModule);


/***/ }),

/***/ "./src/admin/admin.service.ts":
/*!************************************!*\
  !*** ./src/admin/admin.service.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_entity_1 = __webpack_require__(/*! libs/entities/user.entity */ "./libs/entities/user.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const parcel_entity_1 = __webpack_require__(/*! libs/entities/parcel.entity */ "./libs/entities/parcel.entity.ts");
const flight_entity_1 = __webpack_require__(/*! libs/entities/flight.entity */ "./libs/entities/flight.entity.ts");
const prices_entity_1 = __webpack_require__(/*! libs/entities/prices.entity */ "./libs/entities/prices.entity.ts");
const flightsFrom_enum_1 = __webpack_require__(/*! libs/enums/flightsFrom.enum */ "./libs/enums/flightsFrom.enum.ts");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const accese_levels_enum_1 = __webpack_require__(/*! libs/enums/accese.levels.enum */ "./libs/enums/accese.levels.enum.ts");
const payment_entity_1 = __webpack_require__(/*! libs/entities/payment.entity */ "./libs/entities/payment.entity.ts");
const transactions_entity_1 = __webpack_require__(/*! libs/entities/transactions.entity */ "./libs/entities/transactions.entity.ts");
const address_entety_1 = __webpack_require__(/*! libs/entities/address.entety */ "./libs/entities/address.entety.ts");
let AdminService = class AdminService {
    constructor(flightRepositry, userRepository, parcelRepository, PriceRepository, paymentHistory, transactionRepostiory, entityManager) {
        this.flightRepositry = flightRepositry;
        this.userRepository = userRepository;
        this.parcelRepository = parcelRepository;
        this.PriceRepository = PriceRepository;
        this.paymentHistory = paymentHistory;
        this.transactionRepostiory = transactionRepostiory;
        this.entityManager = entityManager;
    }
    async onModuleInit() {
        const admin = await this.userRepository.findOne({ where: { email: process.env.ADMIN_EMAIL } });
        if (!admin) {
            const admin = this.userRepository.create({
                password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
                email: process.env.ADMIN_EMAIL,
                accessLevel: accese_levels_enum_1.AccessLevel.SUPER_ADMIN,
            });
            await this.userRepository.save(admin);
        }
        let price = await this.PriceRepository.findOne({ where: { id: process.env.PRICE_ID } });
        if (!price) {
            const price = this.PriceRepository.create({ id: process.env.PRICE_ID, China: 9.90, Turkey: 3.00 });
            await this.PriceRepository.save(price);
        }
        const dummyData = [
            {
                Province: "Guangdong",
                Country: "China",
                District: "Tianhe",
                Street: "Zhujiang Road",
                Address: "123 Zhujiang Road, Tianhe, Guangzhou",
                TEL: "+86 20 1234 5678",
                ZIP: "510000"
            },
            {
                Province: "Istanbul",
                Country: "Turkey",
                District: "Fatih",
                Street: "Divanyolu Street",
                Address: "15 Divanyolu Street, Fatih, Istanbul",
                TEL: "+90 212 123 4567",
                ZIP: "34122"
            },
        ];
        dummyData.forEach((val) => {
            this.createAddress(val);
        });
    }
    async uploadParcels(data) {
        try {
            const Flight = await this.createFlight(data.flight_info);
            if (!Flight) {
                throw new common_1.ConflictException(`problem with flight`);
            }
            const price = await this.PriceRepository.findOne({ where: { id: "1" } });
            if (!Flight) {
                throw new common_1.NotFoundException(`Prices not found`);
            }
            const parcels = [];
            for (const parcel of data.parcels) {
                let owner = await this.userRepository.findOne({ where: { id: parcel.ownerId } });
                if (!owner) {
                    throw new common_1.ConflictException(`owoner with this id ${parcel.ownerId} does not exist`);
                }
                const createdParcel = this.parcelRepository.create({
                    id: parcel.tracking_id,
                    price: Flight.flight_from === flightsFrom_enum_1.FlightFrom.CHINA ? parcel.weight * price.China : parcel.weight * price.Turkey,
                    owner: owner ? owner : null,
                    weight: parcel.weight,
                    flight: Flight,
                });
                parcels.push(createdParcel);
            }
            const createdParcel = await this.parcelRepository.save(parcels);
            if (!createdParcel) {
                throw new common_1.ConflictException(createdParcel);
            }
            return createdParcel;
        }
        catch (error) {
            console.log(error);
            throw new common_1.ConflictException(error.message);
        }
    }
    async createFlight(createFlightDto) {
        console.log(createFlightDto);
        const existingFlight = await this.flightRepositry.findOne({
            where: { flight_id: createFlightDto.flight_id }
        });
        if (existingFlight) {
            return existingFlight;
        }
        const newFlight = this.flightRepositry.create(createFlightDto);
        return await this.flightRepositry.save(newFlight);
    }
    async getAllParcel(_data) {
        try {
            const { tracking_id = '', ownerId = null, page = 1, limit = 10 } = _data;
            const query = this.parcelRepository.createQueryBuilder('parcel')
                .leftJoin('parcel.owner', 'owner')
                .leftJoinAndSelect('parcel.declaration', 'declaration')
                .addSelect(['owner.id']);
            if (tracking_id) {
                query.andWhere('parcel.id = :tracking_id', { tracking_id });
            }
            if (ownerId) {
                query.andWhere('parcel.ownerId = :ownerId', { ownerId });
            }
            const totalCount = await query.getCount();
            query.skip((page - 1) * limit).take(limit);
            const parcels = await query.getMany();
            const totalPages = Math.ceil(totalCount / limit);
            return {
                parcels,
                totalPages,
                totalCount,
                currentPage: page
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to retrieve parcels');
        }
    }
    async updateParcel(id, updateParcelDto) {
        try {
            const parcel = await this.parcelRepository.preload({
                id,
                ...updateParcelDto,
            });
            if (!parcel) {
                throw new common_1.NotFoundException(`Parcel with ID ${id} not found`);
            }
            return await this.parcelRepository.save(parcel);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(`Failed to update parcel with ID ${id}: ${error.message}`);
        }
    }
    async deleteParcel(id) {
        try {
            const result = await this.parcelRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Parcel with ID ${id} not found`);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Failed to delete parcel with ID ${id}`);
        }
    }
    async getUsers(data) {
        try {
            const { personalNumber = '', page = 1, limit = 10 } = data;
            const query = this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.userDetails', 'userDetails')
                .leftJoinAndSelect('user.transactions', 'transactions');
            if (personalNumber) {
                query.andWhere('userDetails.personal_number = :personal_number', { personal_number: personalNumber });
            }
            const totalCount = await query.getCount();
            console.log('Total count:', totalCount);
            query.skip((page - 1) * limit).take(limit);
            const users = await query.getMany();
            console.log('Users fetched:', users);
            const totalPages = Math.ceil(totalCount / limit);
            const parsedUser = users.map((user) => {
                const { transactions, ...rest } = user;
                const balance = user.balance;
                return { ...rest, balance };
            });
            return {
                parsedUser,
                totalPages,
                totalCount,
                currentPage: page,
            };
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    }
    async updateUser(id, data) {
        const { email, password, first_name, last_name, phone_number, city, address, office, personal_number } = data;
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['userDetails'],
        });
        if (!user) {
            throw new Error(`User with ID ${id} not found.`);
        }
        user.email = email ?? user.email;
        user.password = password ?? user.password;
        user.userDetails.first_name = first_name ?? user.userDetails.first_name;
        user.userDetails.last_name = last_name ?? user.userDetails.last_name;
        user.userDetails.phone_number = phone_number ?? user.userDetails.phone_number;
        user.userDetails.city = city ?? user.userDetails.city;
        user.userDetails.address = address ?? user.userDetails.address;
        user.userDetails.personal_number = personal_number ?? user.userDetails.personal_number;
        user.userDetails.office = office ?? user.userDetails.office;
        const updatedUser = await this.userRepository.save(user);
        return updatedUser;
    }
    async deleteUser(id) {
        try {
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }
            await this.userRepository.delete(id);
        }
        catch (error) {
            console.error('Error removing user:', error);
            throw new Error(error.message);
        }
    }
    async updatePrice(data) {
        try {
            const { china, turkey } = data;
            const PRICES = await this.PriceRepository.findOne({
                where: { id: process.env.PRICE_ID },
            });
            PRICES.China = china ?? PRICES.China;
            PRICES.Turkey = turkey ?? PRICES.Turkey;
            this.PriceRepository.save(PRICES);
        }
        catch (error) {
        }
    }
    async getPaymentHistory(page, limit, userId, sort = 'DESC') {
        try {
            const skip = (page - 1) * limit;
            console.log();
            const query = this.paymentHistory.createQueryBuilder('paymentHistory');
            if (userId) {
                query.where('paymentHistory.userId = :userId', { userId });
            }
            query.orderBy('paymentHistory.date', sort);
            query.skip(skip).take(limit);
            const [data, total] = await query.getManyAndCount();
            return {
                data,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.error('Error in getPaymentHistory:', error);
            throw new Error(error.message);
        }
    }
    async transactionHistory(page, limit, userId, sort = 'DESC') {
        try {
            const skip = (page - 1) * limit;
            console.log();
            const query = this.transactionRepostiory.createQueryBuilder('Transaction');
            if (userId) {
                query.where('transactions.userId = :userId', { userId });
            }
            query.orderBy('Transaction.date', sort);
            query.skip(skip).take(limit);
            const [data, total] = await query.getManyAndCount();
            return {
                data,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            console.error('Error in Transaction:', error);
            throw new Error(error.message);
        }
    }
    async createAddress(createAddressDto) {
        try {
            const existingAddress = await this.entityManager.findOne(address_entety_1.Address, {
                where: {
                    Province: createAddressDto.Province,
                    District: createAddressDto.District,
                    Street: createAddressDto.Street,
                    ZIP: createAddressDto.ZIP
                }
            });
            if (existingAddress) {
                console.log(`Address already exists: ${existingAddress.Address}`);
                return null;
            }
            const address = this.entityManager.create(address_entety_1.Address, createAddressDto);
            return await this.entityManager.save(address);
        }
        catch (error) {
            throw new Error(`Error creating address: ${error.message}`);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(flight_entity_1.Flight)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(parcel_entity_1.Parcel)),
    __param(3, (0, typeorm_1.InjectRepository)(prices_entity_1.Price)),
    __param(4, (0, typeorm_1.InjectRepository)(payment_entity_1.PaymentHistory)),
    __param(5, (0, typeorm_1.InjectRepository)(transactions_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof typeorm_2.EntityManager !== "undefined" && typeorm_2.EntityManager) === "function" ? _g : Object])
], AdminService);


/***/ }),

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getPrices() {
        return await this.appService.getPrices();
    }
    async getAddress() {
        return await this.appService.findAllAddress();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('get-prices'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPrices", null);
__decorate([
    (0, common_1.Get)("addresses"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAddress", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('app'),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_module_1 = __webpack_require__(/*! ./user/user.module */ "./src/user/user.module.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./src/auth/auth.module.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const user_entity_1 = __webpack_require__(/*! ../libs/entities/user.entity */ "./libs/entities/user.entity.ts");
const parcel_entity_1 = __webpack_require__(/*! libs/entities/parcel.entity */ "./libs/entities/parcel.entity.ts");
const declaration_entity_1 = __webpack_require__(/*! libs/entities/declaration.entity */ "./libs/entities/declaration.entity.ts");
const admin_module_1 = __webpack_require__(/*! ./admin/admin.module */ "./src/admin/admin.module.ts");
const transactions_entity_1 = __webpack_require__(/*! libs/entities/transactions.entity */ "./libs/entities/transactions.entity.ts");
const userDetails_entity_1 = __webpack_require__(/*! libs/entities/userDetails.entity */ "./libs/entities/userDetails.entity.ts");
const flight_entity_1 = __webpack_require__(/*! libs/entities/flight.entity */ "./libs/entities/flight.entity.ts");
const prices_entity_1 = __webpack_require__(/*! libs/entities/prices.entity */ "./libs/entities/prices.entity.ts");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const payment_entity_1 = __webpack_require__(/*! libs/entities/payment.entity */ "./libs/entities/payment.entity.ts");
const transaction_module_1 = __webpack_require__(/*! ./transaction/transaction.module */ "./src/transaction/transaction.module.ts");
const address_entety_1 = __webpack_require__(/*! libs/entities/address.entety */ "./libs/entities/address.entety.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
        imports: [
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            user_module_1.UserModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('MYSQL_HOST'),
                    port: configService.get('MYSQL_PORT'),
                    username: configService.get('MYSQL_USER'),
                    password: configService.get('MYSQL_PASSWORD'),
                    database: configService.get('MYSQL_DB'),
                    entities: [user_entity_1.User, parcel_entity_1.Parcel, declaration_entity_1.Declaration, transactions_entity_1.Transaction, userDetails_entity_1.UserDetails, flight_entity_1.Flight, payment_entity_1.PaymentHistory, prices_entity_1.Price, address_entety_1.Address],
                    synchronize: true,
                    migrationsRun: true,
                    logging: false,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([prices_entity_1.Price]),
            transaction_module_1.TransactionModule,
        ],
    })
], AppModule);


/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const address_entety_1 = __webpack_require__(/*! libs/entities/address.entety */ "./libs/entities/address.entety.ts");
const prices_entity_1 = __webpack_require__(/*! libs/entities/prices.entity */ "./libs/entities/prices.entity.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let AppService = class AppService {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async getPrices() {
        try {
            const prices = await this.entityManager.findOne(prices_entity_1.Price, { where: { id: process.env.PRICE_ID } });
            return prices;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findAllAddress() {
        try {
            return await this.entityManager.find(address_entety_1.Address);
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.EntityManager !== "undefined" && typeorm_1.EntityManager) === "function" ? _a : Object])
], AppService);


/***/ }),

/***/ "./src/auth/auth.controller.ts":
/*!*************************************!*\
  !*** ./src/auth/auth.controller.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const auth_dto_1 = __webpack_require__(/*! ./dto/auth.dto */ "./src/auth/dto/auth.dto.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(body) {
        return this.authService.register(body);
    }
    async login(body) {
        return this.authService.login(body);
    }
    async forgetPassword(body) {
        return this.authService.forgetPassword(body.email);
    }
    async adminLogin(body) {
        return this.authService.login(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.RegisterDto !== "undefined" && auth_dto_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('forget-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('admin-login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),

/***/ "./src/auth/auth.module.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/auth/auth.service.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./src/auth/auth.controller.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mailer_module_1 = __webpack_require__(/*! src/mailer/mailer.module */ "./src/mailer/mailer.module.ts");
const user_entity_1 = __webpack_require__(/*! libs/entities/user.entity */ "./libs/entities/user.entity.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const userDetails_entity_1 = __webpack_require__(/*! libs/entities/userDetails.entity */ "./libs/entities/userDetails.entity.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, userDetails_entity_1.UserDetails]),
            mailer_module_1.MailerModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '60m' },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),

/***/ "./src/auth/auth.service.ts":
/*!**********************************!*\
  !*** ./src/auth/auth.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const mailer_service_1 = __webpack_require__(/*! src/mailer/mailer.service */ "./src/mailer/mailer.service.ts");
const user_entity_1 = __webpack_require__(/*! libs/entities/user.entity */ "./libs/entities/user.entity.ts");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const userDetails_entity_1 = __webpack_require__(/*! libs/entities/userDetails.entity */ "./libs/entities/userDetails.entity.ts");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
let AuthService = class AuthService {
    constructor(jwtService, entityManager, mailerService) {
        this.jwtService = jwtService;
        this.entityManager = entityManager;
        this.mailerService = mailerService;
    }
    async register(registerDto) {
        try {
            return await this.entityManager.transaction(async (transactionalEntityManager) => {
                const user = transactionalEntityManager.create(user_entity_1.User, {
                    email: registerDto.email,
                    password: await bcrypt.hash(registerDto.password, 10),
                });
                const createdUser = await transactionalEntityManager.save(user);
                const userDetails = transactionalEntityManager.create(userDetails_entity_1.UserDetails, {
                    id: createdUser.id,
                    user: user,
                    first_name: registerDto.first_name,
                    last_name: registerDto.last_name,
                    phone_number: registerDto.phone_number,
                    personal_number: registerDto.personal_number,
                    office: registerDto.office,
                    city: registerDto.city,
                    address: registerDto.address,
                });
                await transactionalEntityManager.save(userDetails);
                const payload = {
                    email: createdUser.email,
                    sub: createdUser.id,
                    accessLevel: createdUser.accessLevel,
                };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            });
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('user With this email or personal number already exists');
            }
            else if (error.code) {
                throw new common_1.InternalServerErrorException(`Database error: ${error.detail}`);
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to register user.');
            }
        }
    }
    async login(loginDto) {
        try {
            const { email, password } = loginDto;
            const user = await this.entityManager.findOne(user_entity_1.User, { where: { email } });
            let passwordValid = await bcrypt.compare(password, user.password);
            if (!user || !passwordValid)
                throw new common_1.UnauthorizedException('პაროლი ან  ელ-ფოსტა არასწორია.');
            const payload = {
                email: user.email,
                sub: user.id,
                accessLevel: user.accessLevel
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.UnauthorizedException(error.message);
            }
            throw new common_1.InternalServerErrorException('Login failed.');
        }
    }
    async forgetPassword(email) {
        const user = await this.entityManager.findOne(user_entity_1.User, { where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('მომხმარებელი ამ ელ-ფოსტით ვერ მოიძებნა.');
        }
        const payload = {
            email: user.email,
            sub: user.id,
            accessLevel: user.accessLevel,
        };
        const resetToken = this.jwtService.sign(payload);
        await this.mailerService.sendActivationEmail(resetToken, user.email);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.EntityManager !== "undefined" && typeorm_1.EntityManager) === "function" ? _b : Object, typeof (_c = typeof mailer_service_1.MailerService !== "undefined" && mailer_service_1.MailerService) === "function" ? _c : Object])
], AuthService);


/***/ }),

/***/ "./src/auth/dto/auth.dto.ts":
/*!**********************************!*\
  !*** ./src/auth/dto/auth.dto.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 30, { message: 'First name must be between 2 and 30 characters long' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 30, { message: 'Last name must be between 2 and 30 characters long' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
    (0, class_validator_1.Length)(9, 15, { message: 'Phone number must be between 9 and 15 digits' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Personal number must contain only digits' }),
    (0, class_validator_1.Length)(11, 11, { message: 'Personal number must be exactly 11 digits' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "personal_number", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "office", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "address", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./src/mailer/mailer.module.ts":
/*!*************************************!*\
  !*** ./src/mailer/mailer.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mailer_service_1 = __webpack_require__(/*! ./mailer.service */ "./src/mailer/mailer.service.ts");
let MailerModule = class MailerModule {
};
exports.MailerModule = MailerModule;
exports.MailerModule = MailerModule = __decorate([
    (0, common_1.Module)({
        providers: [mailer_service_1.MailerService],
        exports: [mailer_service_1.MailerService]
    })
], MailerModule);


/***/ }),

/***/ "./src/mailer/mailer.service.ts":
/*!**************************************!*\
  !*** ./src/mailer/mailer.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");
let MailerService = class MailerService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
    }
    async sendActivationEmail(link, email) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Activate your account',
            html: `<p>Please click <a href="${process.env.BASE_URL}/${link}">here</a> to activate your account.</p>`
        };
        const data = this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return 'Error sending email:';
            }
            else {
                return 'Activation email sent:';
            }
        });
        console.log(data);
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailerService);


/***/ }),

/***/ "./src/transaction/transaction.controller.ts":
/*!***************************************************!*\
  !*** ./src/transaction/transaction.controller.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transaction_service_1 = __webpack_require__(/*! ./transaction.service */ "./src/transaction/transaction.service.ts");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async callBackToPay(paymentReq) {
        return this.transactionService.GetRedirectUrlAsync(paymentReq);
    }
    async updateBalance(body) {
        return this.transactionService.depositeBalance(body);
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)("callback-topay"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "callBackToPay", null);
__decorate([
    (0, common_1.Post)('deposite'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "updateBalance", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('transaction'),
    __metadata("design:paramtypes", [typeof (_a = typeof transaction_service_1.TransactionService !== "undefined" && transaction_service_1.TransactionService) === "function" ? _a : Object])
], TransactionController);


/***/ }),

/***/ "./src/transaction/transaction.module.ts":
/*!***********************************************!*\
  !*** ./src/transaction/transaction.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const transaction_service_1 = __webpack_require__(/*! ./transaction.service */ "./src/transaction/transaction.service.ts");
const transaction_controller_1 = __webpack_require__(/*! ./transaction.controller */ "./src/transaction/transaction.controller.ts");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
let TransactionModule = class TransactionModule {
};
exports.TransactionModule = TransactionModule;
exports.TransactionModule = TransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
        ],
        controllers: [transaction_controller_1.TransactionController],
        providers: [transaction_service_1.TransactionService],
        exports: [transaction_service_1.TransactionService],
    })
], TransactionModule);


/***/ }),

/***/ "./src/transaction/transaction.service.ts":
/*!************************************************!*\
  !*** ./src/transaction/transaction.service.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const moment = __webpack_require__(/*! moment */ "moment");
const crypto = __webpack_require__(/*! crypto */ "crypto");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const user_entity_1 = __webpack_require__(/*! ../../libs/entities/user.entity */ "./libs/entities/user.entity.ts");
const payment_entity_1 = __webpack_require__(/*! ../../libs/entities/payment.entity */ "./libs/entities/payment.entity.ts");
const transactions_entity_1 = __webpack_require__(/*! ../../libs/entities/transactions.entity */ "./libs/entities/transactions.entity.ts");
const transactions_enum_1 = __webpack_require__(/*! ../../libs/enums/transactions.enum */ "./libs/enums/transactions.enum.ts");
let TransactionService = class TransactionService {
    constructor(entityManager, httpService) {
        this.entityManager = entityManager;
        this.httpService = httpService;
    }
    async depositeBalance(body) {
        try {
            const userId = body.order_id.split(";")[0].split(":")[1];
            if (!userId) {
                throw new common_1.BadRequestException('Invalid order_id format');
            }
            if (body.order_status !== 'approved') {
                console.log("Order has not been approved");
                throw new common_1.ConflictException("Payment failed");
            }
            return await this.entityManager.transaction(async (manager) => {
                const existingPayment = await manager.findOne(payment_entity_1.PaymentHistory, {
                    where: {
                        payment_id: body.payment_id,
                    },
                });
                if (existingPayment) {
                    throw new common_1.ConflictException('Payment already recorded.');
                }
                const user = await manager.findOne(user_entity_1.User, { where: { id: userId } });
                if (!user) {
                    throw new common_1.NotFoundException("User does not exist");
                }
                const depositAmount = body.amount / 100;
                const newTransaction = manager.create(transactions_entity_1.Transaction, {
                    user,
                    date: new Date(),
                    amount: depositAmount,
                    transactionType: transactions_enum_1.TransactionType.DEPOSIT,
                });
                const paymentHistory = manager.create(payment_entity_1.PaymentHistory, {
                    amount: depositAmount,
                    payment_id: body.payment_id,
                    currency: body.currency,
                    masked_card: body.masked_card,
                    maskresponse_signature_stringed_card: body.response_signature_string,
                    userId: userId,
                    user,
                });
                user.balance = Number(user.balance) + depositAmount;
                await manager.save(payment_entity_1.PaymentHistory, paymentHistory);
                await manager.save(transactions_entity_1.Transaction, newTransaction);
                await manager.save(user_entity_1.User, user);
                return newTransaction;
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.ConflictException("Payment failed");
        }
    }
    async GetRedirectUrlAsync(paymentReq) {
        console.log(paymentReq);
        const body = await this.createPaymentRequestBody(paymentReq);
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://pay.flitt.com/api/checkout/url', body, {
                headers: { 'Content-Type': 'application/json' }
            }));
            return response.data;
        }
        catch (error) {
            console.error('Error making payment request:', error.response?.data || error.message);
            throw new Error('Payment request failed');
        }
    }
    async createPaymentRequestBody(paymentReq) {
        const unixSecound = moment().unix();
        const signatureData = await this.buildSignature(paymentReq, unixSecound);
        const signature = (await this.hashData(signatureData)).toLowerCase();
        console.log(signatureData);
        console.log(signature);
        return {
            "request": {
                "server_callback_url": "https://ninesky.ge/backend/api/transaction/deposite",
                "order_id": `userId:${paymentReq.userId};firstName:${paymentReq.customerFirstName};lastName:${paymentReq.customerLastName};dateTime:${unixSecound}`,
                "currency": paymentReq.currency,
                "merchant_id": process.env.PAYMENT_VENDOR_CODE,
                "order_desc": paymentReq.userId,
                "amount": paymentReq.amount,
                "signature": signature
            }
        };
    }
    async buildSignature(paymentReq, unixSecond) {
        return `test|${paymentReq.amount}|${paymentReq.currency}|${process.env.PAYMENT_VENDOR_CODE}|${paymentReq.userId}|userId:${paymentReq.userId};firstName:${paymentReq.customerFirstName};lastName:${paymentReq.customerLastName};dateTime:${unixSecond}|https://ninesky.ge/backend/api/transaction/deposite`;
    }
    async hashData(data) {
        console.log(crypto.createHash('sha1').update(data).digest('hex'));
        return crypto.createHash('sha1').update(data).digest('hex');
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.EntityManager !== "undefined" && typeorm_1.EntityManager) === "function" ? _a : Object, typeof (_b = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _b : Object])
], TransactionService);


/***/ }),

/***/ "./src/user/user.controller.ts":
/*!*************************************!*\
  !*** ./src/user/user.controller.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./src/user/user.service.ts");
const update_user_dto_1 = __webpack_require__(/*! ../../libs/dtos/UserDto.ts/update-user.dto */ "./libs/dtos/UserDto.ts/update-user.dto.ts");
const Jwt_Auth_Guard_1 = __webpack_require__(/*! libs/guards/Jwt.Auth.Guard */ "./libs/guards/Jwt.Auth.Guard.ts");
const getUser_1 = __webpack_require__(/*! libs/decorators/getUser */ "./libs/decorators/getUser.ts");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const createDeclarationDto_1 = __webpack_require__(/*! libs/dtos/declarationDtos.ts/createDeclarationDto */ "./libs/dtos/declarationDtos.ts/createDeclarationDto.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(user) {
        return await this.userService.getProfile(user.sub);
    }
    async updateProfile(user, body) {
        return await this.userService.updateProfile(user.sub, body);
    }
    async declarateParcel(body, file) {
        const invoice_Pdf = file ? file.buffer : null;
        return await this.userService.createDeclaration({
            ...body,
            invoice_Pdf,
        });
    }
    async updateDeclaration(body, file) {
        const invoice_Pdf = file ? file.buffer : undefined;
        return await this.userService.updateDeclaration({ ...body, invoice_Pdf });
    }
    async payParcels(user, body) {
        return this.userService.payParcels(user.sub, body);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, getUser_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof userPaylaod !== "undefined" && userPaylaod) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)("update"),
    __param(0, (0, getUser_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof userPaylaod !== "undefined" && userPaylaod) === "function" ? _c : Object, typeof (_d = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('declarate-parcel'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof createDeclarationDto_1.CreateDeclarationDto !== "undefined" && createDeclarationDto_1.CreateDeclarationDto) === "function" ? _e : Object, typeof (_g = typeof Express !== "undefined" && (_f = Express.Multer) !== void 0 && _f.File) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "declarateParcel", null);
__decorate([
    (0, common_1.Put)('update-declaration'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof createDeclarationDto_1.CreateDeclarationDto !== "undefined" && createDeclarationDto_1.CreateDeclarationDto) === "function" ? _h : Object, typeof (_k = typeof Express !== "undefined" && (_j = Express.Multer) !== void 0 && _j.File) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateDeclaration", null);
__decorate([
    (0, common_1.Post)('pay-parcels'),
    __param(0, (0, getUser_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof userPaylaod !== "undefined" && userPaylaod) === "function" ? _l : Object, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "payParcels", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(Jwt_Auth_Guard_1.JwtAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./src/user/user.module.ts":
/*!*********************************!*\
  !*** ./src/user/user.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./src/user/user.service.ts");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./src/user/user.controller.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_entity_1 = __webpack_require__(/*! ../../libs/entities/user.entity */ "./libs/entities/user.entity.ts");
const Jwt_Auth_Guard_1 = __webpack_require__(/*! libs/guards/Jwt.Auth.Guard */ "./libs/guards/Jwt.Auth.Guard.ts");
const parcel_entity_1 = __webpack_require__(/*! libs/entities/parcel.entity */ "./libs/entities/parcel.entity.ts");
const declaration_entity_1 = __webpack_require__(/*! libs/entities/declaration.entity */ "./libs/entities/declaration.entity.ts");
const transactions_entity_1 = __webpack_require__(/*! libs/entities/transactions.entity */ "./libs/entities/transactions.entity.ts");
const jwt_strategy_1 = __webpack_require__(/*! libs/jwt/jwt.strategy */ "./libs/jwt/jwt.strategy.ts");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const payment_entity_1 = __webpack_require__(/*! libs/entities/payment.entity */ "./libs/entities/payment.entity.ts");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, parcel_entity_1.Parcel, declaration_entity_1.Declaration, transactions_entity_1.Transaction, payment_entity_1.PaymentHistory]), axios_1.HttpModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, Jwt_Auth_Guard_1.JwtAuthGuard, jwt_strategy_1.JwtStrategy],
        exports: [user_service_1.UserService,]
    })
], UserModule);


/***/ }),

/***/ "./src/user/user.service.ts":
/*!**********************************!*\
  !*** ./src/user/user.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_entity_1 = __webpack_require__(/*! ../../libs/entities/user.entity */ "./libs/entities/user.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const parcel_entity_1 = __webpack_require__(/*! libs/entities/parcel.entity */ "./libs/entities/parcel.entity.ts");
const declaration_entity_1 = __webpack_require__(/*! libs/entities/declaration.entity */ "./libs/entities/declaration.entity.ts");
const transactions_entity_1 = __webpack_require__(/*! libs/entities/transactions.entity */ "./libs/entities/transactions.entity.ts");
const transactions_enum_1 = __webpack_require__(/*! libs/enums/transactions.enum */ "./libs/enums/transactions.enum.ts");
const payment_status_enum_1 = __webpack_require__(/*! libs/enums/payment.status.enum */ "./libs/enums/payment.status.enum.ts");
const axios_1 = __webpack_require__(/*! @nestjs/axios */ "@nestjs/axios");
const payment_entity_1 = __webpack_require__(/*! libs/entities/payment.entity */ "./libs/entities/payment.entity.ts");
let UserService = class UserService {
    constructor(transactionRepository, PaymentHistory, userRepository, parcelRepository, declarationRepository, httpService) {
        this.transactionRepository = transactionRepository;
        this.PaymentHistory = PaymentHistory;
        this.userRepository = userRepository;
        this.parcelRepository = parcelRepository;
        this.declarationRepository = declarationRepository;
        this.httpService = httpService;
    }
    async getProfile(id) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                relations: ['transactions', 'parcels', 'parcels.declaration', 'userDetails', "payment_history"],
            });
            return {
                ...user,
                balance: user.balance,
            };
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
    async updateProfile(id, data) {
        const { email, password, personal_number, office, first_name, last_name, phone_number, city, address } = data;
        console.log(data);
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['userDetails'],
        });
        const createdUser = this.userRepository.create({ email, password, userDetails: { first_name, office, personal_number, last_name, phone_number, city, address } });
        await this.userRepository.save(createdUser);
        return user;
    }
    async createDeclaration(createDeclarationDto) {
        try {
            const { type, price, website, comment, invoice_Pdf, tracking_id } = createDeclarationDto;
            console.log(createDeclarationDto);
            const parcel = await this.parcelRepository.findOne({ where: { id: tracking_id } });
            const declaration = this.declarationRepository.create({
                type,
                price,
                website,
                comment: comment || null,
                invoice_Pdf: invoice_Pdf ? invoice_Pdf : null,
            });
            const savedDeclaration = await this.declarationRepository.save(declaration);
            parcel.declaration = savedDeclaration;
            await this.parcelRepository.save(parcel);
            return savedDeclaration;
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async updateDeclaration(updateDeclarationDto) {
        try {
            const { type, price, website, comment, invoice_Pdf, tracking_id } = updateDeclarationDto;
            const parcel = await this.parcelRepository.findOne({
                where: { id: tracking_id },
                relations: ['declaration']
            });
            if (!parcel) {
                throw new Error('Parcel not found');
            }
            let declaration = parcel.declaration;
            if (!declaration) {
                declaration = this.declarationRepository.create({
                    type,
                    price,
                    website,
                    comment: comment || null,
                    invoice_Pdf: invoice_Pdf ? invoice_Pdf : null,
                });
            }
            else {
                declaration.type = type;
                declaration.price = price;
                declaration.website = website;
                declaration.comment = comment || null;
                if (invoice_Pdf) {
                    declaration.invoice_Pdf = invoice_Pdf;
                }
            }
            const savedDeclaration = await this.declarationRepository.save(declaration);
            parcel.declaration = savedDeclaration;
            await this.parcelRepository.save(parcel);
            return savedDeclaration;
        }
        catch (error) {
            console.error('Error updating declaration:', error);
            throw error;
        }
    }
    async payParcels(userId, parcels) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        const pricesList = await Promise.all(parcels.map(async (parcel) => {
            const mainParcel = await this.parcelRepository.findOne({ where: { id: parcel.tracking_id } });
            if (mainParcel) {
                mainParcel.payment_status = payment_status_enum_1.PaymentType.PAID;
                await this.parcelRepository.save(mainParcel);
                return Number(mainParcel.price);
            }
            return 0;
        }));
        const totalPrice = pricesList.reduce((acc, price) => acc + price, 0);
        if (user.balance < totalPrice) {
            console.log('User does not have sufficient balance');
            return;
        }
        const createTransaction = this.transactionRepository.create({
            amount: totalPrice,
            date: new Date(),
            transactionType: transactions_enum_1.TransactionType.PAYMENT,
            user,
        });
        await this.transactionRepository.save(createTransaction);
        user.balance = user.balance - totalPrice;
        await this.userRepository.save(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transactions_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.PaymentHistory)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(parcel_entity_1.Parcel)),
    __param(4, (0, typeorm_1.InjectRepository)(declaration_entity_1.Declaration)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _f : Object])
], UserService);


/***/ }),

/***/ "@nestjs/axios":
/*!********************************!*\
  !*** external "@nestjs/axios" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173', 'https://ninesky.ge', "*"],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(process.env.PORT || 3001);
}
bootstrap();

})();

/******/ })()
;