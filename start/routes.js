"use strict";

const Route = use("Route");

// autenticação

Route.post("sessions", "SessionController.store");

Route.group(() => {
  Route.get("users/options", "UserController.options");
  Route.post("users", "UserController.index");
  Route.get("users/:id", "UserController.show");
  Route.put("users/:id", "UserController.update");

  // Rotas complementares - Retorna um objeto com value e

  Route.get("indications", "IndicationController.index");
  Route.post("indications", "IndicationController.store");
  Route.get("schooling", "SchoolingController.index");
  Route.get("maritalStatus", "MaritalStatusController.index");
  Route.get("races", "RaceController.index");

  Route.get("ocupations", "OcupationController.index");
  Route.post("ocupations", "OcupationController.store");

  // Fluxo do sistema - obrigatório

  Route.get("company/:id", "CompanyController.show");
  Route.put("company/:id", "CompanyController.update");

  Route.get("openingHours", "OpeningHourController.index");
  Route.put("openingHours", "OpeningHourController.update");

  Route.get("rooms/options", "RoomController.options");
  Route.resource("rooms", "RoomController").apiOnly();
  Route.put("rooms/:id/status", "RoomController.status");

  Route.get("patients/options", "PatientController.options");
  Route.resource("patients", "PatientController").apiOnly();

  Route.get("partnerships", "PartnershipController.index");
  Route.get("partnerships/options", "PartnershipController.options");
  Route.get("partnerships/:id", "PartnershipController.show");
  Route.post("partnerships", "PartnershipController.store");
  Route.put("partnerships/:id", "PartnershipController.update");
  Route.put("partnerships/:id/status", "PartnershipController.status");
  Route.get(
    "partnershipsProfessionals",
    "ProcedureProfessionalController.getProceduresProfissionals"
  );

  Route.resource("procedures", "ProcedureController").apiOnly();
  Route.put("procedures/:id/status", "ProcedureController.status");

  Route.post(
    "proceduresProfessionals",
    "ProcedureProfessionalController.store"
  );
  Route.get("proceduresProfessionals", "ProcedureProfessionalController.index");
  Route.get(
    "proceduresProfessionals",
    "ProcedureProfessionalController.options"
  );
  Route.get(
    "proceduresProfessionals/options",
    "ProcedureProfessionalController.options"
  );
  Route.delete(
    "proceduresProfessionals/:id",
    "ProcedureProfessionalController.destroy"
  );

  Route.get("roles", "RoleController.index");

  Route.get("professionals/options", "ProfessionalController.makeOptions");
  // Professionals routes
  Route.post("professionals", "ProfessionalController.store");
  Route.put("professionals/:id", "ProfessionalController.update");
  Route.get("professionals", "ProfessionalController.index");
  Route.get("professionals/:id", "ProfessionalController.show");

  // professional Schedule Routes

  Route.resource(
    "professionalSchedule",
    "ProfessionalScheduleController"
  ).apiOnly();
  Route.get("schedules/:id", "ScheduleController.show");
  Route.put("schedules/:id", "ScheduleController.update");
  Route.put("schedules/confirm/:id", "ScheduleController.handleConfirm");
  Route.put("schedules/cancel/:id", "ScheduleController.handleCancel");
  Route.put("schedules/preConfirm/:id", "ScheduleController.handlePreConfirm");
  Route.put(
    "schedules/authorization/:id",
    "ScheduleController.handleAuthorization"
  );

  Route.put("schedules/end/:id", "ScheduleController.handleEnd");

  Route.post("schedules", "ScheduleController.index");
  Route.post("schedules/new", "ScheduleController.store");

  Route.post("schedules/manually", "ScheduleController.saveScheduleManually");
  Route.post("mySchedules", "ScheduleController.mySchedules");

  // Rotas do Financeiro

  Route.resource("financials", "FinancialController").apiOnly();

  Route.get("accounts/options", "AccountController.options");
  Route.resource("accounts", "AccountController").apiOnly();

  Route.get("types/options", "TypeController.options");

  Route.post("movementCategories", "MovementCategoryController.store");
  Route.get("movementCategories/options", "MovementCategoryController.options");

  Route.get("creditorsDebtors", "CreditorDebtorController.index");
  Route.get("creditorsDebtors/options", "CreditorDebtorController.options");
  Route.post("creditorsDebtors", "CreditorDebtorController.store");

  Route.get("formPayments/options", "FormPaymentController.options");
  Route.post("formPayments", "FormPaymentController.store");

  // Relatórios

  Route.post("scheduleReport", "ScheduleReportController.index");
}).middleware(["auth"]);
