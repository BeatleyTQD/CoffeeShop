using CoffeeShop.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeShop.Repositories
{
    public class CoffeeRepository
    {
        private readonly string _connectionString;
        public CoffeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        private SqlConnection Connection
        {
            get { return new SqlConnection(_connectionString); }
        }

        public List<Coffee> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                                                c.Id AS CoffeeId, c.Title, c.BeanVarietyId AS CoffeeBVid,
                                                b.Id AS BeanVarietyId, b.Name, b.Region, b.Notes
                                          FROM Coffee c 
                                          JOIN BeanVariety b ON C.BeanVarietyId = b.Id";
                    var reader = cmd.ExecuteReader();

                    var coffees = new List<Coffee>();

                    while (reader.Read())
                    {
                        var coffee = new Coffee()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            BeanVarietyId = reader.GetInt32(reader.GetOrdinal("CoffeeBVid")),
                            BeanVariety = new BeanVariety
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Region = reader.GetString(reader.GetOrdinal("Region"))
                            }
                        };

                        coffees.Add(coffee);
                    }
                    reader.Close();
                    return coffees;
                }
            }
        }
    }
}

