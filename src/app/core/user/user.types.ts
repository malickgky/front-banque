import { DateTime } from "luxon"

let user = {

}
export interface User {
    menus: any[],
    id: number,
    idSuperieur: number,
    vcPassword: string,
    vcLastName: string,
    vcFirstName: string,
    vcMsisdn: string,
    vcRoleName: string,
    idRole: number,
    vcCode: string,
    vcCodeBanking: string,
    vcCodeBankingCommission: string,
    vcAdresse: string,
    vcAgenceName: string,
    vcProfession: string,
    vcEmail: string,
    vcRole: string,
    idAgence: number,
    vcAgence: string,
    typePiece: {
        id: number,
        vcTypePiece: string,
        btEnabled: boolean,
        dtCreated: DateTime,
        dtUpdated: DateTime
    },
    btFirstLogin: false,
    btEnabled: true,
    vcBithPlace: string,
    vcPieceIdentity: string,
    dtValidityPiece: DateTime,
    dtBithDate: DateTime,
    dtDelivrancyPiece: DateTime,
    dtCreated: DateTime,
    dtUpdated: DateTime
}