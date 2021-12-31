namespace PM.Business.Core.Consts
{
    /// <summary>
    /// Holds all api routes of system
    /// </summary>
    public class ApiRoutes
    {
        /// <summary>
        /// common prefix for all routes
        /// for versioning version prefix can be added here and it will be reflected to all routes
        /// </summary>
        private const string _root = "api/";

        public static class Product
        {
            private const string _base = _root + "products/";

            /// <summary>
            /// api/products
            /// </summary>
            public const string GetAll = _base;

            /// <summary>
            /// api/products/kendo-grid
            /// </summary>
            public const string GetKendoData = _base + "kendo-grid";

            /// <summary>
            /// api/products/{id}
            /// </summary>
            public const string Get = _base + "{id}";

            /// <summary>
            /// api/products/save
            /// </summary>
            public const string Save = _base + "save";

            /// <summary>
            /// api/products/{id}
            /// </summary>
            public const string Delete = _base + "{id}";

            /// <summary>
            /// api/products/toggle-active/{id}
            /// </summary>
            public const string ToggleActive = _base + "toggle-active/{id}";
        }

        public static class Category
        {
            private const string _base = _root + "categories/";

            /// <summary>
            /// api/categories
            /// </summary>
            public const string GetAll = _base;

            /// <summary>
            /// api/categories/kendo-grid
            /// </summary>
            public const string GetKendoData = _base + "kendo-grid";

            /// <summary>
            /// api/categories
            /// </summary>
            public const string Save = _base;

            /// <summary>
            /// api/categories/{id}
            /// </summary>
            public const string Delete = _base + "{id}";

            /// <summary>
            /// api/categories/toggle-active/{id}
            /// </summary>
            public const string ToggleActive = _base + "toggle-active/{id}";
        }

        public static class User
        {
            private const string _base = _root + "users/";

            /// <summary>
            /// api/users/login
            /// </summary>
            public const string Login = _base + "login";

            /// <summary>
            /// api/users/register
            /// </summary>
            public const string Register = _base + "register";

            /// <summary>
            /// api/users/confirm-email
            /// </summary>
            public const string ConfirmEmail = _base + "confirm-email";
        }

        public static class Module
        {
            private const string _base = _root + "modules/";

            /// <summary>
            /// api/modules
            /// </summary>
            public const string GetAll = _base;

            /// <summary>
            /// api/modules/{id}
            /// </summary>
            public const string Get = _base + "{id}";

            /// <summary>
            /// api/modules
            /// </summary>
            public const string Save = _base;

            /// <summary>
            /// api/modules/{id}
            /// </summary>
            public const string Delete = _base + "{id}";

            /// <summary>
            /// api/modules/toggle-active/{id}
            /// </summary>
            public const string ToggleActive = _base + "toggle-active/{id}";
        }
    }
}
