class Contact < ApplicationRecord
  has_many :messages, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true

  validates :messages, presence: true

  accepts_nested_attributes_for :messages, reject_if: proc { |attributes| attributes['body'].blank? }
end
