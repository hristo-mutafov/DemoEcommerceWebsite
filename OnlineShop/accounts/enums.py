import enum

from OnlineShop.core.model_mixins import GetEnumValuesMixin, GetEnumMaxLenValueMixin


class GenderEnum(GetEnumValuesMixin, GetEnumMaxLenValueMixin, enum.Enum):
    male = 'Male'
    female = 'Female'
    other = 'Other'
