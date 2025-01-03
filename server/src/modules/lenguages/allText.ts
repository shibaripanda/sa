interface LengData {
    rutext: string
    index: string
    info_data: string
    update?: boolean
}

interface LengDataStart {
    title: string
    index: string
    info: string
}

export const lengs: LengDataStart[] = [
    {title: 'Русский', index: 'ru', info: 'русский'},
    {title: 'English', index: 'en', info: 'английский'},
    {title: 'Español', index: 'es', info: 'испанский'},
    {title: 'Français', index: 'fr', info: 'французский'},
    {title: 'Português', index: 'pt', info: 'португальский'},
    {title: 'Deutsch', index: 'de', info: 'немецкий'},
    {title: '中文', index: 'zh', info: 'китайский'},
    {title: 'Italiano', index: 'it', info: 'итальянский'},
    {title: '日本語', index: 'ja', info: 'японский'},
    {title: '한국어', index: 'ko', info: 'корейский'},
    {title: 'العربية', index: 'ar', info: 'арабский'},
    {title: 'हिन्दी', index: 'hi', info: 'хинди'},
    {title: 'עברית', index: 'he', info: 'иврит'},
    {title: 'Türkçe', index: 'tr', info: 'турецкий'},
    {title: 'Tiếng Việt', index: 'vi', info: 'вьетнамский'},
    {title: 'Nederlands', index: 'nl', info: 'голландский'},
    {title: 'Polski', index: 'pl', info: 'польский'},
    {title: 'Bahasa Indonesia', index: 'id', info: 'индонезийский'},
    {title: 'Svenska', index: 'sv', info: 'шведский'},
    {title: 'Čeština', index: 'cs', info: 'чешский'},
    {title: 'Українська', index: 'uk', info: 'украинский'},
    {title: 'Magyar', index: 'hu', info: 'венгерский'},
    {title: 'ไทย', index: 'th', info: 'тайский'},
    {title: 'Ελληνικά', index: 'el', info: 'греческий'},
    {title: 'Dansk', index: 'da', info: 'датский'},
    {title: 'Suomi', index: 'fi', info: 'финский'},
    {title: 'Română', index: 'ro', info: 'румынский'},
    {title: 'Slovenčina', index: 'sk', info: 'словацкий'},
    {title: 'Беларуская', index: 'be', info: 'белорусский'}
]

export const textArray: LengData[] = [
    {rutext: 'Привет', index: 'hello', info_data: 'приветствие'},
    {rutext: 'Пользователь не найден или произошла ошибка', index: 'userError1', info_data: 'юзер не найден'},
    {rutext: 'Пользователь уже существует', index: 'existUser', info_data: 'юзер существует'},
    {rutext: 'Временный пароль выслан на почту', index: 'codeSendToEmail', info_data: 'пароль на почту выслан'},
    {rutext: 'Временный пароль', index: 'newCode', info_data: 'временный пароль'},
    {rutext: 'Добро пожаловать!', index: 'welcome', info_data: 'добро пожаловать'},
    {rutext: 'Войти', index: 'login', info_data: 'войти'},
    {rutext: 'Отправить сеансовый пароль на почту', index: 'sendPasswordToEmail', info_data: 'отправить парол на почту'},
    {rutext: 'Невалидный емейл', index: 'badEmail', info_data: 'невалидный емейл'},
    {rutext: 'Выход', index: 'exit', info_data: 'выход'},
    {rutext: 'Авторизоваться', index: 'auth', info_data: 'авторизоваться'},
    {rutext: 'Мы создаем новый сервис для вас. Пожалуйста подождите...', index: 'newServiceCreating', info_data: 'создаем сервис ожидание'},
    {rutext: 'Настройка сервиса', index: 'serviceSettings', info_data: 'настройки сервиса'},
    {rutext: 'Создать заказ', index: 'createOrder', info_data: 'создать заказ'},
    {rutext: 'Заказы', index: 'orders', info_data: 'заказы'},
    {rutext: 'Сохранить', index: 'save', info_data: 'сохранить'},
    {rutext: 'Новое имя для сервиса', index: 'newNameForService', info_data: 'новое имя для сервиса'},
    {rutext: 'Новое имя для локального сервиса', index: 'newNameForSubService', info_data: 'новое имя для локального сервиса'},
    {rutext: 'Изменение имени сервиса', index: 'editingNameService', info_data: 'изменение имени сервиса'},
    {rutext: 'Название сервиса', index: 'changeNameMainService', info_data: 'изменение имени сервиса', update: false},
    {rutext: 'Название локального сервиса', index: 'changeNameSubService', info_data: 'изменение имени локального сервиса', update: false},
    {rutext: 'Список девайсов', index: 'changeServiceDeviceList', info_data: 'список девайсов', update: false},
    {rutext: 'Название девайса (примеры: Ноутбук, Холодильник, Кот)', index: 'deviceName', info_data: 'название девайса', update: false},
    {rutext: 'Добавить', index: 'add', info_data: 'добавить', update: false},
    {rutext: 'Статусы', index: 'changeServiceStatusList', info_data: 'статусы', update: false},
    {rutext: 'Статус (примеры: Готов, Ожидает запчасти, На согласовании)', index: 'statusName', info_data: 'название статуса', update: false},
    {rutext: 'Роли', index: 'changeServiceRole', info_data: 'роли', update: false},
    {rutext: 'Новая роль', index: 'newRole', info_data: 'новая роль', update: false},
    {rutext: 'Пользователи', index: 'changeServiceUser', info_data: 'юзеры', update: false},
    {rutext: 'Локальные сервисы', index: 'changeLocalService', info_data: 'Локальные сервисы', update: false},
    {rutext: 'Настройки локального сервиса', index: 'serviceLocalSettings', info_data: 'настройки локального сервиса', update: false},
    {rutext: 'Имя для нового локального сервиса', index: 'newNameForLocalService', info_data: 'новое имя для локального сервиса'},
    {rutext: 'Для входа перелогиниться!', index: 'outLoginForEnter', info_data: 'перелогиниться для входа'},
    {rutext: 'Рабочее время', index: 'changeTimeSubService', info_data: 'рабочее время'},
    {rutext: 'Неустановлено', index: 'notSet', info_data: 'неустановлено'},
    {rutext: 'Время работы (пример: с 10:00 до 12:00, понедельник - пятница, выходной: воскресенье)', index: 'workTime', info_data: 'установка время работы', update: false},
    {rutext: 'Контакты', index: 'changeContactSubService', info_data: 'контакты'},
    {rutext: 'Контакты (пример: +334 355 6464646)', index: 'workContact', info_data: 'установка контактов'},
    {rutext: 'Адрес', index: 'changeAddressSubService', info_data: 'адрес'},
    {rutext: 'Адрес (пример: Северный полюс, Берлога №7, комната 5)', index: 'workAddress', info_data: 'установка адреса'},
    
]
