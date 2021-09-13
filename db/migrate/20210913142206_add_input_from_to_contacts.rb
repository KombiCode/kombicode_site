class AddInputFromToContacts < ActiveRecord::Migration[6.1]
  def change
    add_column :contacts, :input_from, :string
  end
end
