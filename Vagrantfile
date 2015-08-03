# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.define "frontyard-01" do |frontend|
    frontend.vm.box = "trusty"
    frontend.vm.host_name = "frontyard-01"
    frontend.vm.network :private_network, ip: "192.168.56.104"
    frontend.vm.synced_folder "/home/mickadoo/workspace/frontyard", "/var/www/frontyard", id: "frontyard-root",
      owner: "vagrant",
      group: "www-data",
      mount_options: ["dmode=775,fmode=664"]
    frontend.vm.provision :salt do |salt|
      salt.run_highstate = true
      salt.minion_config = "./app/config/vagrant/frontyard_01.conf"
      salt.bootstrap_options = "-P"
    end
  end
end
