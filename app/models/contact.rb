class Contact < ApplicationRecord
  has_many :messages, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true
end
