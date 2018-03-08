require 'csv'
# seed animals (category 1)
Category.create(name: 'animals')
csv_text = File.read(Rails.root.join('lib', 'seeds', 'animals.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Card.new
  c.name = row['name']
  c.img_url = row['img_url']
  c.category_id = row['category_id']
  c.save
end
puts "saved #{csv.length} animals"

# seed celebrities (category 2)
Category.create(name: 'celebrities')
csv_text = File.read(Rails.root.join('lib', 'seeds', 'celebrities.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Card.new
  c.name = row['name']
  c.img_url = row['img_url']
  c.category_id = row['category_id']
  c.save
end
puts "saved #{csv.length} celebrities"

# seed TV shows (category 3)


# seed Nicolas Cage (category 4)
