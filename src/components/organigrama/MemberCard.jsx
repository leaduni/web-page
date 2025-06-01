import React from 'react';

const MemberCard = ({ member, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(member.name)}
      className="bg-gradient-to-br from-[#1B1B3B] to-[#0E0E2E] p-6 rounded-xl border border-[#3a1e6a] hover:border-[#a0218b] hover:shadow-xl text-center cursor-pointer transition-all"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
      />
      <h3 className="font-bold text-lg text-white mb-1">{member.name}</h3>
      <p className="text-white/70">{member.position}</p>
      <p className="text-sm mt-2 text-[#a0218b] hover:underline">Ver perfil completo</p>
    </div>
  );
};

export default MemberCard;
