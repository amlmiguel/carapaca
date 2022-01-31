using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entitties;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;
        public ProductRepository(StoreContext context)
        {
            _context = context;
        }

         public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.ProductType)
                .Include(p => p.ProductBrand)       
                .Include(p => p.ProductColor)       
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            return await _context.Products
                .Include(p => p.ProductType)
                .Include(p => p.ProductBrand)
                .Include(p => p.ProductColor)    
                .ToListAsync();
        }

        // public async Task<Product> GetProductByIdAsync(int id)
        // {
        //     return await _context.Products.FindAsync(id);
        // }

        // public async Task<IReadOnlyList<Product>> GetProductsAsync()
        // {
        //     return await _context.Products.ToListAsync();
        // }

        public async Task<IReadOnlyList<ProductBrand>> GetProductsBrandsAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductColor>> GetProductsColorsAsync()
        {
            return await _context.ProductColors.ToListAsync();
        }

        public async Task<IReadOnlyList<ProductType>> GetProductsTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }
    }
}