"use strict";

const Route = use("Route");

/*
Route.post('/indications', 'IndicationController.store')
Route.get('/indications', 'IndicationController.index')
Route.get('/indications/:id', 'IndicationController.show')
Route.put('/indications/:id', 'IndicationController.update')
Route.delete('/indications/:id', 'IndicationController.destroy')
*/

Route.resource("indications", "IndicationController").apiOnly();
Route.resource("schooling", "SchoolingController").apiOnly();
Route.resource("maritalStatus", "MaritalStatusController").apiOnly();
Route.resource("races", "RaceController").apiOnly();
Route.resource("patients", "PatientController").apiOnly();

Route.resource("rooms", "RoomController").apiOnly();
Route.put("rooms/:id/status", "RoomController.status");

Route.get("company/:id", "CompanyController.show");
Route.put("company/:id", "CompanyController.update");

Route.get("openingHours", "OpeningHourController.index");
Route.put("openingHours", "OpeningHourController.update");

Route.get("partnerships", "PartnershipController.index");
Route.get("partnerships/:id", "PartnershipController.show");
Route.post("partnerships", "PartnershipController.store");
Route.put("partnerships/:id", "PartnershipController.update");
Route.put("partnerships/:id/status", "PartnershipController.status");

Route.resource("procedures", "ProcedureController").apiOnly();
Route.put("procedures/:id/status", "ProcedureController.status");

Route.get("roles", "RoleController.index");

Route.get("ocupations", "OcupationController.index");
Route.post("ocupations", "OcupationController.store");

// Professionals routes
Route.post("professionals", "ProfessionalController.store");
Route.get("professionals", "ProfessionalController.index");
Route.get("professionals/:id", "ProfessionalController.show");
