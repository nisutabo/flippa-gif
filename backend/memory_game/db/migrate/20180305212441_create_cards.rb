class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.string :img_url
      t.integer :category_id

      t.timestamps
    end
  end
end
