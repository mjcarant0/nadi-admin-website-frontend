import enum


class UserRole(str, enum.Enum):
    BHW = "BHW"
    DTTB = "DTTB"
    ADMIN = "ADMIN"


class SyncStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    SYNCING = "SYNCING"
    CLOUD_SYNCED = "CLOUD_SYNCED"


class WHODangerSignType(str, enum.Enum):
    SEVERE_PREECLAMPSIA = "SEVERE_PREECLAMPSIA"
    HYPERTENSION = "HYPERTENSION"
    HYPOXIA = "HYPOXIA"
    ABNORMAL_FHR = "ABNORMAL_FHR"
    INFECTION_SEPSIS = "INFECTION_SEPSIS"
    NONE = "NONE"
