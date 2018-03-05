require 'csv'

Category.create(name: 'animal')

csv_text = File.read(Rails.root.join('lib', 'seeds', 'cards.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  c = Card.new
  c.name = row['name']
  c.img_url = row['img_url']
  c.category_id = row['category_id']
  c.save
  puts "saved #{c.name}"
end
