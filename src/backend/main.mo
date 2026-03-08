import Time "mo:core/Time";
import Int "mo:core/Int";
import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";

actor {
  type LoveNote = {
    message : Text;
    timestamp : Time.Time;
  };

  module LoveNote {
    public func compare(note1 : LoveNote, note2 : LoveNote) : Order.Order {
      Int.compare(note2.timestamp, note1.timestamp);
    };
  };

  let notesList = List.empty<LoveNote>();

  public shared ({ caller }) func submitNote(message : Text) : async () {
    let newNote : LoveNote = {
      message;
      timestamp = Time.now();
    };
    notesList.add(newNote);
  };

  public query ({ caller }) func getAllNotes() : async [LoveNote] {
    notesList.toArray().sort();
  };
};
