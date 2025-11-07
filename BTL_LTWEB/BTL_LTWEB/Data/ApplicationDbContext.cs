using Microsoft.EntityFrameworkCore;
using BTL_LTWEB.Models;

namespace BTL_LTWEB.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Promo> Promos { get; set; }
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Promo>()
                .HasOne(p => p.Product)
                .WithOne(pr => pr.Promo)
                .HasForeignKey<Promo>(p => p.Masp);
            modelBuilder.Entity<ProductDetail>()
                .HasOne(pd => pd.Product)
                .WithOne(p => p.Detail)
                .HasForeignKey<ProductDetail>(pd => pd.Masp);
        }

    }
}