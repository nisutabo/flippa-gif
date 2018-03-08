require 'csv'

Category.create(name: 'animal')
# seed animals (category 1)
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
