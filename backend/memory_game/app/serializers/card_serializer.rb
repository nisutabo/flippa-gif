class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :img_url, :category_id
  belongs_to :category, serializer: CardCategorySerializer
end
