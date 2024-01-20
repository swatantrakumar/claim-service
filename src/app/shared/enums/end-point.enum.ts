export enum EndPoint {
    PUBLIC = "public/",
    GET_USER_PERMISSION = "user/getupm",
    GET_ONLINE_CASE_SUBMISSION = "cas/goncfcsub",
    GET_CLAIM_STATIC = "cas/gcfbu",
    GET_CASES_OR_PERMISSIO = "user/perms",
    GET_STATIC_DATA="rpts/sobj",
    GET_CLAIM_STATIC_DATA_FROM_CASE = "opt/gtclmstc",
    GET_CLAIM_NEW_FORM = "cas/nclf",
    CHECK_EMAIL_EXISTS = "cas/checkexistingclaim",
    SAVE_CLAIM = "cas/svsicsat",
    FILE_UPLOAD = "vdr/crtfl/",
    DELETE_FILE = "vdr/dlfl",
    DOWNLOAD_FILE = "vdr/getfl/download",
    GET_CLAIM_STATUS = "cas/gcfc/",
    ADD_OR_UPDATE_USER = 'user'
}
