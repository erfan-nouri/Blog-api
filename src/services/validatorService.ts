import * as yup from 'yup'

export const registerValidator = async (data: object) => {


          const validatorSchema = yup.object().shape({
                    firstName: yup.string().required('وارد کردن نام الرامی میباشد.').min(5, 'نام کاربر باید حداقل 5 کاراکتر باشد.').max(255, 'نام کاربر نمیتواند بیشتر از 255 کاراکتر باشد.').trim(),
                    lastName: yup.string().required('وارد کردن نام خانوادگی الرامی میباشد.').min(5, 'نام کاربر باید حداقل 5 کاراکتر باشد.').max(255, 'نام کاربر نمیتواند بیشتر از 255 کاراکتر باشد.').trim(),
                    email: yup.string().email('ایمیل به درستی وارد نشده است.').trim().required('وارد کردن ایمیل الرامی میباشد.'),
                    mobile: yup.number().required('وارد کردن موبایل الرامی میباشد.'),
                    password: yup.string().required('وارد کردن پسورد الزامی است').min(8, 'رمزعبور نمیتواند کمتر از 8 کاراکتر باشد').max(2551, 'رمزعبور نمیتواند بیشتر از 255 کاراکتر باشد').trim(),
                    confirm_password: yup.string().oneOf([yup.ref('password'), null], 'رمز عبور یکسان نیستند.').required('وارد کردن پسورد الزامی است')
          })

          try {
                    await validatorSchema.validate(data, { abortEarly: false })
                    return []
          }
          catch (error) {
                    return error.errors;
          }
}

export const postValidator = async (data: object) => {
          const validatorSchema = yup.object().shape({
                    title: yup.string().required('وارد کردن عنوان الرامی میباشد.').min(5, 'عنوان باید حداقل 5 کاراکتر باشد.').max(150, 'عنوان نمیتواند بیشتر از 150 کاراکتر باشد.').trim(),
                    slug: yup.string().required('وارد کردن نامک الرامی میباشد.').min(3, 'نامک باید حداقل 3 کاراکتر باشد.').max(100, 'نامک نمیتواند بیشتر از 100 کاراکتر باشد.').trim(),
                    category: yup.string().required('وارد کردن دسته الرامی میباشد.').min(5, 'دسته باید حداقل 5 کاراکتر باشد.').max(255, 'دسته نمیتواند بیشتر از 255 کاراکتر باشد.').trim(),
                    thumbnail: yup.string().required('وارد کردن دسته الرامی میباشد.').trim(),
                    text: yup.string().required('وارد کردن متن پست الرامی میباشد.').min(20, 'متن پست باید حداقل 5 کاراکتر باشد.').trim(),
                    author: yup.string().required(),
                    status: yup.number().required()
          })

          try {
                    await validatorSchema.validate(data, { abortEarly: false })
                    return []
          } catch (error) {
                    return error.errors
          }
}
