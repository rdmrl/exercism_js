/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Creates a new visitor.
 *
 * @param {string} name
 * @param {number} age
 * @param {string} ticketId
 * @returns {Visitor} the visitor that was created
 */
export function createVisitor(name, age, ticketId) {
  return { name: name, age: age, ticketId: ticketId };
}

/**
 * Revokes a ticket for a visitor.
 *
 * @param {Visitor} visitor the visitor with an active ticket
 * @returns {Visitor} the visitor without a ticket
 */
export function revokeTicket(visitor) {
  visitor.ticketId = null;
  return visitor;
}

/**
 * Determines the status a ticket has in the ticket tracking object.
 *
 * @param {Record<string, string|null>} tickets
 * @param {string} ticketId
 * @returns {string} ticket status
 */
export function ticketStatus(tickets, ticketId) {
  if( tickets.hasOwnProperty( ticketId ) ) {
    const name = tickets[ ticketId ];
    if( "undefined" !== typeof( name ) && name !== null ) {
      return `sold to ${name}`;
    } else {
      return 'not sold';
    }
  } else {
    return 'unknown ticket id';
  }
}

/**
 * Determines the status a ticket has in the ticket tracking object
 * and returns a simplified status message.
 *
 * @param {Record<string, string|null>} tickets
 * @param {string} ticketId
 * @returns {string} ticket status
 */
export function simpleTicketStatus(tickets, ticketId) {
  if( tickets.hasOwnProperty( ticketId ) ) {
    const name = tickets[ ticketId ];
    if( "undefined" !== typeof( name ) && name !== null ) {
      return name;
    } else {
      return 'invalid ticket !!!';
    }
  } else {
    return 'invalid ticket !!!';
  }
}

/**
 * Determines the version of the GTC that was signed by the visitor.
 *
 * @param {VisitorWithGtc} visitor
 * @returns {string | undefined} version
 */
export function gtcVersion(visitor) {
  let version;

  /*
  if( visitor.hasOwnProperty( 'gtc' ) ) {
    const gtcObj = visitor[ 'gtc' ];
    if( gtcObj.hasOwnProperty( 'version' ) ) {
      version =  gtcObj[ 'version' ];
    }
  }

  if( visitor[ 'gtc' ] && visitor[ 'gtc' ][ 'version' ] ) {
    version = visitor[ 'gtc' ][ 'version' ];
  }

  if( 'gtc' in visitor ) {
    const gtcObj = visitor[ 'gtc' ];
    if( 'version' in gtcObj ) {
      version = gtcObj[ 'version' ];
    }
  }
  */

  if( typeof visitor.gtc !== "undefined" && 
    typeof visitor.gtc.version !== "undefined" ) {
    version = visitor.gtc.version;
  }

  return version;
}
