using System;

namespace PM.Business.Core.DataTransferModels.Product
{
    public class ProductDetail
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string SubTitle { get; set; }
        public string Description { get; set; }
        public decimal RetailPrice { get; set; }
        public decimal SalePrice { get; set; }
        public string ImageUrl { get; set; }
        public int Quentity { get; set; }
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public DateTime ManufactoredAt { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
